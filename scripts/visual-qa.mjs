import { chromium } from "playwright-core";
import path from "node:path";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const baseURL = process.env.QA_BASE_URL ?? "http://localhost:3000/prompt-shop";
const cases = [
  { name: "home-1440", url: `${baseURL}/`, width: 1440, height: 1200 },
  { name: "home-375", url: `${baseURL}/`, width: 375, height: 1000 },
  { name: "product-1440", url: `${baseURL}/product/site-concept-prompt-demo/`, width: 1440, height: 1200 },
  { name: "product-375", url: `${baseURL}/product/site-concept-prompt-demo/`, width: 375, height: 1000 },
];

for (const item of cases) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1 });
  await page.goto(item.url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.resolve(`${item.name}.png`), fullPage: false });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heading: document.querySelector("h1")?.textContent?.trim(),
  }));
  console.log(item.name, metrics);
  await page.close();
}

const checkout = await browser.newPage({ viewport: { width: 1024, height: 900 } });
await checkout.goto(`${baseURL}/checkout/?type=product&item=site-concept-prompt-demo`, { waitUntil: "networkidle" });
await checkout.locator('input[type="email"]').fill("qa@example.com");
await checkout.locator('input[type="checkbox"]').check();
await checkout.getByRole("button", { name: "Оплатить" }).click();
await checkout.waitForURL(/\/thanks\/?\?/);
console.log("checkout-flow", {
  url: checkout.url(),
  heading: await checkout.locator("h1").innerText(),
});
await checkout.close();

await browser.close();
