// Сервис оплаты магазина: создаёт платёж в ЮKassa, принимает уведомление об оплате
// и отправляет покупателю письмо со ссылками на скачивание.
// Данные покупателя не хранятся: email и Telegram уходят в метаданные платежа ЮKassa
// и в письмо-уведомление владельцу. Локально храним только id обработанных платежей.
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import { allProducts as products } from "../data/products.ts";
import { bundles } from "../data/bundles.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(here, "..", ".env.local"));

const env = process.env;
const PORT = Number(env.PORT || 8787);
const SITE_URL = (env.SITE_URL || "https://creative-ai.shop").replace(/\/$/, "");
const FILES_DIR = env.FILES_DIR || path.join(here, "files");
const STATE_DIR = env.STATE_DIR || path.join(here, "state");
const DOWNLOAD_DAYS = 30;
for (const key of ["YOOKASSA_SHOP_ID", "YOOKASSA_SECRET_KEY", "SMTP_USER", "SMTP_PASSWORD", "DOWNLOAD_SECRET"]) {
  if (!env[key]) throw new Error(`Не задана переменная ${key}`);
}
fs.mkdirSync(STATE_DIR, { recursive: true });
const PROCESSED = path.join(STATE_DIR, "processed.txt");

const mailer = nodemailer.createTransport({
  host: env.SMTP_HOST || "smtp.mail.ru",
  port: Number(env.SMTP_PORT || 465),
  secure: true,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
});

// ---------- каталог: цены берём только отсюда, а не из запроса ----------
function resolveItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) return null;
  const seen = new Set();
  const lines = [];
  for (const item of items) {
    const key = `${item?.type}:${item?.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (item.type === "bundle") {
      const b = bundles.find((x) => x.slug === item.slug);
      if (!b) return null;
      const inner = products.filter((p) => b.productSlugs.includes(p.slug));
      lines.push({ key, title: b.title, price: b.price, slugs: inner.map((p) => p.slug) });
    } else {
      const p = products.find((x) => x.slug === item.slug);
      if (!p || p.externalUrl) return null; // боты продаются в Telegram, не через сайт
      lines.push({ key, title: p.title, price: p.isFree ? 0 : p.price, slugs: [p.slug] });
    }
  }
  return lines;
}

// ---------- ЮKassa ----------
const auth = "Basic " + Buffer.from(`${env.YOOKASSA_SHOP_ID}:${env.YOOKASSA_SECRET_KEY}`).toString("base64");
async function yookassa(method, url, body) {
  const res = await fetch(`https://api.yookassa.ru/v3${url}`, {
    method,
    headers: { Authorization: auth, "Content-Type": "application/json", ...(body ? { "Idempotence-Key": crypto.randomUUID() } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`ЮKassa ${res.status}: ${data.description || JSON.stringify(data)}`);
  return data;
}

// ---------- ссылки на скачивание: подписаны, без базы данных ----------
const sign = (slug, exp) => crypto.createHmac("sha256", env.DOWNLOAD_SECRET).update(`${slug}.${exp}`).digest("base64url");
function downloadLinks(slugs) {
  const exp = Math.floor(Date.now() / 1000) + DOWNLOAD_DAYS * 86400;
  return slugs.map((slug) => {
    const p = products.find((x) => x.slug === slug);
    return { title: p?.title || slug, url: `${SITE_URL}/api/download/${slug}?e=${exp}&s=${sign(slug, exp)}` };
  });
}
function findFile(slug) {
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(FILES_DIR)) return null;
  const name = fs.readdirSync(FILES_DIR).find((f) => f.startsWith(slug + "."));
  return name ? path.join(FILES_DIR, name) : null;
}

// ---------- письма ----------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
async function sendMaterials({ email, telegram, ads, lines, amount, paymentId }) {
  const slugs = lines.flatMap((l) => l.slugs);
  // курс и подобное: вместо ссылки на файл — текст про доступ из каталога
  const accessItems = slugs.map((slug) => products.find((x) => x.slug === slug)).filter((p) => p?.access);
  const links = downloadLinks(slugs.filter((slug) => !accessItems.some((p) => p.slug === slug)));
  const list = links.map((l) => `<li style="margin:0 0 12px"><b>${esc(l.title)}</b><br><a href="${l.url}">Скачать</a></li>`).join("");
  const accessHtml = accessItems.map((p) => `<p style="margin:0 0 12px"><b>${esc(p.title)}</b><br>${esc(p.access)}</p>`).join("");
  const accessText = accessItems.map((p) => `${p.title}\n${p.access}`).join("\n\n");
  const linksText = links.map((l) => `${l.title}\n${l.url}`).join("\n\n");
  await mailer.sendMail({
    from: { name: "Иван Панькин", address: env.SMTP_USER },
    to: email,
    subject: links.length ? "Ваши материалы — creative-ai.shop" : "Ваш заказ — creative-ai.shop",
    text: `Спасибо за покупку!\n\n${[accessText, linksText].filter(Boolean).join("\n\n")}${links.length ? `\n\nСсылки работают ${DOWNLOAD_DAYS} дней.` : ""}\n\nВопросы — ответьте на это письмо.`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
<p>Спасибо за покупку!</p>${accessHtml}${list ? `<ul style="padding-left:18px">${list}</ul>` : ""}
<p style="color:#666">${links.length ? `Ссылки работают ${DOWNLOAD_DAYS} дней. ` : ""}Если что-то не так — просто ответьте на это письмо.</p></div>`,
  });
  // уведомление владельцу — в свой же ящик
  await mailer.sendMail({
    from: { name: "creative-ai.shop", address: env.SMTP_USER },
    to: env.NOTIFY_EMAIL || env.SMTP_USER,
    subject: `Заказ: ${amount ? amount + " ₽" : "бесплатно"} — ${lines.map((l) => l.title).join(", ")}`.slice(0, 200),
    text: `Email: ${email}\nTelegram: ${telegram}\nСогласие на рассылки: ${ads ? "да" : "нет"}\nСумма: ${amount} ₽\nПлатёж: ${paymentId || "—"}\n\n${lines.map((l) => `· ${l.title} — ${l.price} ₽`).join("\n")}`,
  });
}

// ---------- HTTP ----------
const json = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" }); res.end(JSON.stringify(body)); };
function readBody(req, limit = 20000) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", (c) => { size += c.length; if (size > limit) { reject(new Error("too large")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); } catch { reject(new Error("bad json")); } });
    req.on("error", reject);
  });
}

async function handlePay(req, res) {
  const body = await readBody(req);
  const email = String(body.email || "").trim();
  const telegram = String(body.telegram || "").trim().slice(0, 40);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return json(res, 400, { error: "Проверьте email" });
  const lines = resolveItems(body.items);
  if (!lines) return json(res, 400, { error: "Товар не найден или недоступен для покупки на сайте" });
  const amount = lines.reduce((s, l) => s + l.price, 0);
  const ads = Boolean(body.adsConsent);

  if (amount === 0) {
    await sendMaterials({ email, telegram, ads, lines, amount: 0 });
    return json(res, 200, { redirect: "/thanks/?free=1" });
  }

  const description = `creative-ai.shop: ${lines.map((l) => l.title).join(", ")}`.slice(0, 128);
  const payment = await yookassa("POST", "/payments", {
    amount: { value: amount.toFixed(2), currency: "RUB" },
    capture: true,
    confirmation: { type: "redirect", return_url: `${SITE_URL}/thanks/` },
    description,
    metadata: { email, telegram, ads: ads ? "1" : "0", items: lines.map((l) => l.key).join(",").slice(0, 500) },
  });
  console.log(`платёж создан ${payment.id} на ${amount} ₽`);
  return json(res, 200, { redirect: payment.confirmation.confirmation_url });
}

// ЮKassa не подписывает уведомления, поэтому статус платежа перепроверяем запросом к API
async function handleWebhook(req, res) {
  const body = await readBody(req);
  const id = body?.object?.id;
  if (!id || !/^[\w-]{10,60}$/.test(id)) return json(res, 400, { error: "bad id" });
  const done = fs.existsSync(PROCESSED) ? fs.readFileSync(PROCESSED, "utf8").split("\n") : [];
  if (done.includes(id)) return json(res, 200, { ok: true });

  const payment = await yookassa("GET", `/payments/${id}`);
  if (payment.status !== "succeeded" || !payment.paid) return json(res, 200, { ok: true, status: payment.status });
  const m = payment.metadata || {};
  const lines = resolveItems((m.items || "").split(",").filter(Boolean).map((k) => { const [type, slug] = k.split(":"); return { type, slug }; }));
  if (!lines || !m.email) { console.error(`платёж ${id}: не разобрать состав заказа`); return json(res, 200, { ok: false }); }
  await sendMaterials({ email: m.email, telegram: m.telegram || "—", ads: m.ads === "1", lines, amount: Number(payment.amount.value), paymentId: id });
  fs.appendFileSync(PROCESSED, id + "\n");
  console.log(`платёж ${id} оплачен, письмо отправлено`);
  return json(res, 200, { ok: true });
}

function handleDownload(req, res, slug) {
  const url = new URL(req.url, "http://x");
  const exp = Number(url.searchParams.get("e"));
  const sig = url.searchParams.get("s") || "";
  const good = sign(slug, exp);
  const valid = sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
  if (!valid) return json(res, 403, { error: "Ссылка недействительна" });
  if (exp < Date.now() / 1000) return json(res, 410, { error: "Срок ссылки истёк — напишите нам, пришлём новую" });
  const file = findFile(slug);
  if (!file) return json(res, 404, { error: "Файл ещё не загружен — напишите нам" });
  const name = path.basename(file);
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Length": fs.statSync(file).size,
    "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
  });
  fs.createReadStream(file).pipe(res);
}

http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://x");
  try {
    if (req.method === "POST" && pathname === "/api/pay") return await handlePay(req, res);
    if (req.method === "POST" && pathname === "/api/yookassa/webhook") return await handleWebhook(req, res);
    if (req.method === "GET" && pathname.startsWith("/api/download/")) return handleDownload(req, res, pathname.split("/")[3]);
    if (pathname === "/api/health") return json(res, 200, { ok: true });
    return json(res, 404, { error: "not found" });
  } catch (err) {
    console.error(pathname, err);
    // на ошибку уведомления ЮKassa повторит запрос — это нам и нужно
    return json(res, 500, { error: "Не получилось оформить заказ, попробуйте ещё раз" });
  }
}).listen(PORT, () => console.log(`оплата слушает :${PORT}`));

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").replace(/^﻿/, "").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
