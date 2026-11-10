"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { priceLabel, products } from "@/data/products";

// Запросы, которые «печатаются» в пустом поле — все находят что-то в каталоге
const HINTS = ["промпт для концепции сайта", "парсер 2ГИС", "рассылки в Telegram", "чек-лист вёрстки", "аудит макета в Figma", "мини-курс по сборке сайта"];

const norm = (text: string) => " " + text.toLowerCase().replace(/ё/g, "е").replace(/[@«»"().,—\[\]_-]/g, " ");

// У каждого слова запроса берём начало (5 букв), чтобы «рассылки» находило «рассылает», а «вёрстки» — «вёрстка»
function search(query: string) {
  const words = norm(query).split(/\s+/).filter((w) => w.length > 1).map((w) => w.slice(0, 5));
  if (words.length === 0) return [];
  return products
    .map((item) => {
      const title = norm(item.title + " " + item.category);
      const body = norm([item.description, ...item.contents, ...item.ai, ...item.volume, item.preview.result].join(" "));
      let score = 0;
      for (const w of words) {
        if (title.includes(" " + w)) score += 3; // совпадение только с начала слова
        else if (body.includes(" " + w)) score += 1;
        else return null; // каждое слово должно найтись
      }
      return { item, score };
    })
    .filter((x): x is { item: (typeof products)[number]; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.item);
}

function useTypingHint(active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    let hint = 0, pos = 0, deleting = false, timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = HINTS[hint];
      if (!deleting) {
        pos++;
        setText(word.slice(0, pos));
        if (pos === word.length) { deleting = true; timer = setTimeout(tick, 1600); return; }
        timer = setTimeout(tick, 55 + Math.random() * 45);
      } else {
        pos--;
        setText(word.slice(0, pos));
        if (pos === 0) { deleting = false; hint = (hint + 1) % HINTS.length; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, 28);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [active]);
  return text;
}

export function HeaderSearch({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [cursor, setCursor] = useState(0);
  const router = useRouter();
  const box = useRef<HTMLDivElement>(null);
  const results = useMemo(() => search(query), [query]);
  const hint = useTypingHint(!focused && query === "");
  const open = focused && query.trim().length > 1;

  useEffect(() => {
    const close = (event: MouseEvent) => { if (box.current && !box.current.contains(event.target as Node)) setFocused(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function go(slug: string) {
    setQuery(""); setFocused(false); onNavigate?.();
    router.push(`/product/${slug}/`);
  }

  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") { event.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    if (event.key === "Enter" && results[cursor]) { event.preventDefault(); go(results[cursor].slug); }
    if (event.key === "Escape") { setFocused(false); (event.target as HTMLInputElement).blur(); }
  }

  return (
    <div className={`header-search ${className}`} ref={box}>
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <input
        type="search"
        value={query}
        onChange={(event) => { setQuery(event.target.value); setCursor(0); }}
        onFocus={() => setFocused(true)}
        onKeyDown={onKey}
        placeholder={focused ? "Что ищете?" : ""}
        aria-label="Поиск по материалам"
        autoComplete="off"
      />
      {!focused && query === "" && <span className="search-hint" aria-hidden>{hint}<i /></span>}
      {open && (
        <div className="search-results" role="listbox">
          {results.length === 0
            ? <p className="search-empty">Ничего не нашли — попробуйте другое слово</p>
            : results.map((item, index) => (
                <Link key={item.slug} href={`/product/${item.slug}/`} className={index === cursor ? "active" : ""} onMouseEnter={() => setCursor(index)} onClick={() => { setQuery(""); setFocused(false); onNavigate?.(); }}>
                  <span><small>{item.category}</small><b>{item.title}</b></span>
                  <em>{priceLabel(item)}</em>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
