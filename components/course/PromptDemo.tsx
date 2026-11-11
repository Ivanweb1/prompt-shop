"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

// Мини-демо: посетитель описывает сайт — терминал печатает план сборки.
// Это заготовки по ключевым словам, настоящий ИИ здесь не вызывается.
const PLANS: { keys: string[]; niche: string; wow: string; frames: string }[] = [
  { keys: ["коф", "кафе", "бар", "чай"], niche: "кофейня", wow: "тема сайта перекрашивается под выбранный напиток", frames: "3 кадра напитков на чистом фоне" },
  { keys: ["дух", "парф", "аромат", "космет", "крем"], niche: "парфюм и косметика", wow: "флакон собирается при прокрутке — скролл-видео", frames: "капля → флакон → ноты аромата → подиум" },
  { keys: ["жк", "недвиж", "квартир", "дом", "застрой"], niche: "недвижимость", wow: "дашборд дома: день и вечер, свет в окнах", frames: "фасад днём и вечером, вид из окна" },
  { keys: ["барбер", "салон", "красот", "ногт", "стриж"], niche: "салон красоты", wow: "до/после шторкой и запись в пару касаний", frames: "мастер за работой, интерьер, результат" },
  { keys: ["ресторан", "еда", "пицц", "суш", "достав"], niche: "ресторан", wow: "блюдо «собирается» из ингредиентов при прокрутке", frames: "ингредиенты в воздухе → готовое блюдо" },
  { keys: ["авто", "машин", "детейл", "шин"], niche: "автосервис", wow: "машина проезжает через экран при прокрутке", frames: "авто в студии с трёх ракурсов" },
];
const CHIPS = ["сайт для кофейни", "лендинг парфюма", "сайт ЖК", "сайт барбершопа"];

function buildPlan(query: string) {
  const q = query.toLowerCase();
  const plan = PLANS.find((p) => p.keys.some((k) => q.includes(k)));
  const niche = plan?.niche ?? "ваша ниша";
  return [
    `> ${query.trim() || "сайт"}`,
    `✓ Ниша: ${niche}`,
    "✓ Беру референс с Pinterest и раскладываю его на блоки",
    `✓ Кадры для нейросети: ${plan?.frames ?? "4 кадра главного объекта"}`,
    `✓ Вау-эффект: ${plan?.wow ?? "переход между кадрами при прокрутке"}`,
    "✓ Собираю страницу, проверяю на телефоне",
    "✓ Выкладываю на GitHub Pages — ссылка для клиента готова",
    "build succeeded · примерно 1–2 дня работы",
  ];
}

export function PromptDemo() {
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [shown, setShown] = useState(0);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    timer.current = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 150 : 420);
    return () => window.clearTimeout(timer.current);
  }, [shown, lines]);

  const run = (text: string) => { setLines(buildPlan(text)); setShown(0); };
  const submit = (event: FormEvent) => { event.preventDefault(); run(value || "сайт для кофейни"); };

  return (
    <div className="c-term">
      <div className="c-term-bar"><i /><i /><i /><span>claude · новый проект</span></div>
      <form className="c-term-form" onSubmit={submit}>
        <label htmlFor="c-prompt" className="sr-only">Опишите сайт</label>
        <input id="c-prompt" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Опишите сайт: например, лендинг парфюма" autoComplete="off" />
        <button type="submit" className="button button-blue button-small">Собрать <span aria-hidden>↵</span></button>
      </form>
      <div className="c-term-chips">
        {CHIPS.map((chip) => <button type="button" key={chip} onClick={() => { setValue(chip); run(chip); }}>{chip}</button>)}
      </div>
      <pre className="c-term-out" aria-live="polite">
        {lines.length === 0 ? <span className="c-term-muted">Здесь появится план сборки…</span> : lines.slice(0, shown).map((line, i) => <span key={i} className={line.startsWith("build") ? "ok" : line.startsWith(">") ? "cmd" : ""}>{line}{"\n"}</span>)}
        {lines.length > 0 && shown < lines.length && <span className="c-term-caret">▍</span>}
      </pre>
      <p className="c-term-note">Это игрушечная версия на заготовках. На курсе то же самое делает настоящий Claude Code</p>
    </div>
  );
}
