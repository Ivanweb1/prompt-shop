"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { DemoVideo } from "@/components/course/DemoVideo";

// Мини-демо: посетитель пишет промпт — терминал печатает план и «собирает» один из демо-сайтов витрины.
// Это заготовки по ключевым словам, настоящий ИИ здесь не вызывается.
type Demo = { slug: string; name: string; url: string; keys: string[]; steps: string[] };
const DEMOS: Demo[] = [
  {
    slug: "mirra", name: "MIRRA", url: "https://ivanweb1.github.io/perfume-wow-demo/",
    keys: ["дух", "парф", "аромат", "космет", "крем", "beauty", "флакон"],
    steps: ["Референс: флакон в центре, карточки и выноски", "Кадры: капля → флакон → ноты → подиум", "Видео-переходы между кадрами", "Скролл-анимация и блок покупки"],
  },
  {
    slug: "kaffa", name: "KAFFA", url: "https://ivanweb1.github.io/kaffa-wow-demo/",
    keys: ["магазин", "зерн", "кофемол", "техник", "посуд", "шоп", "товар"],
    steps: ["Референс: крупный логотип и витрина товаров", "Кадры: зёрна → помол → пролив → глоток", "Сцены сменяются при прокрутке", "Каталог и корзина"],
  },
  {
    slug: "zerno", name: "Зерно", url: "https://ivanweb1.github.io/coffee-wow-demo/",
    keys: ["коф", "кафе", "напит", "латте", "матч", "чай", "бар", "ресторан", "еда"],
    steps: ["Референс: карточка напитка на весь экран", "Три напитка: латте, эспрессо, матча", "Тема сайта перекрашивается под напиток", "Выбор размера и заказ"],
  },
];
const CHIPS = ["лендинг парфюма", "магазин кофе", "сайт кофейни"];

function pick(query: string) {
  const q = query.toLowerCase();
  // «магазин кофе» — KAFFA, просто «кофе/кофейня» — Зерно: поэтому сначала парфюм и магазин
  const found = DEMOS.find((d) => d.keys.some((k) => q.includes(k)));
  if (found) return { demo: found, exact: true };
  return { demo: DEMOS[query.length % DEMOS.length], exact: false };
}

export function PromptDemo() {
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [shown, setShown] = useState(0);
  const [result, setResult] = useState<{ demo: Demo; exact: boolean } | null>(null);
  const [built, setBuilt] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (lines.length === 0) return;
    if (shown < lines.length) {
      timer.current = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 150 : 380);
    } else {
      timer.current = window.setTimeout(() => setBuilt(true), 650);
    }
    return () => window.clearTimeout(timer.current);
  }, [shown, lines]);

  const run = (text: string) => {
    const prompt = text.trim() || "сайт для кофейни";
    const r = pick(prompt);
    setResult(r);
    setBuilt(false);
    setShown(0);
    setLines([`> ${prompt}`, ...r.demo.steps.map((s) => `✓ ${s}`), "✓ Проверяю на телефоне", "build succeeded"]);
  };
  const submit = (event: FormEvent) => { event.preventDefault(); run(value); };
  const reset = () => { setLines([]); setResult(null); setBuilt(false); setValue(""); };

  return (
    <div className="c-term">
      <div className="c-term-bar"><i /><i /><i /><span>claude · новый проект</span></div>
      <form className="c-term-form" onSubmit={submit}>
        <label htmlFor="c-prompt" className="sr-only">Промпт для сайта</label>
        <input id="c-prompt" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Напишите промпт: например, лендинг парфюма" autoComplete="off" />
        <button type="submit" className="button button-blue button-small">Собрать <span aria-hidden>↵</span></button>
      </form>
      <div className="c-term-chips">
        {CHIPS.map((chip) => <button type="button" key={chip} onClick={() => { setValue(chip); run(chip); }}>{chip}</button>)}
      </div>
      <div className="c-term-stage">
        {built && result ? (
          <div className="c-term-result">
            <div className="c-browser">
              <div className="c-browser-bar"><i /><i /><i /><span>{result.demo.name.toLowerCase()} · готово</span></div>
              <DemoVideo key={result.demo.slug} src={asset(`/course/demo-${result.demo.slug}.mp4`)} poster={asset(`/course/demo-${result.demo.slug}.jpg`)} label={`Собранный сайт ${result.demo.name}`} />
            </div>
            <div className="c-term-result-row">
              <span>{result.exact ? `Сайт ${result.demo.name} из витрины` : `Похожий пример из витрины — ${result.demo.name}`}</span>
              <a href={result.demo.url} target="_blank" rel="noreferrer">Открыть сайт ↗</a>
              <button type="button" onClick={reset}>Ещё раз</button>
            </div>
          </div>
        ) : (
          <pre className="c-term-out" aria-live="polite">
            {lines.length === 0 ? <span className="c-term-muted">Напишите промпт или нажмите подсказку — соберу сайт…</span> : lines.slice(0, shown).map((line, i) => <span key={i} className={line.startsWith("build") ? "ok" : line.startsWith(">") ? "cmd" : ""}>{line}{"\n"}</span>)}
            {lines.length > 0 && shown < lines.length && <span className="c-term-caret">▍</span>}
            {lines.length > 0 && shown >= lines.length && <span className="c-term-muted">открываю превью…</span>}
          </pre>
        )}
      </div>
      <p className="c-term-note">Игрушечная версия на заготовках: показывает сайты из витрины. На курсе такие сайты собирает настоящий Claude Code</p>
    </div>
  );
}
