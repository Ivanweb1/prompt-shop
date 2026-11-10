"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Chevron } from "./Chevron";

export type SortMode = "new" | "cheap" | "expensive" | "popular";

const OPTIONS: [SortMode, string][] = [
  ["new", "Новые"],
  ["cheap", "Дешевле"],
  ["expensive", "Дороже"],
  ["popular", "Популярные"],
];

// Свой выпадающий список вместо системного select — чтобы совпадал со стилем сайта
export function SortDropdown({ value, onChange }: { value: SortMode; onChange: (value: SortMode) => void }) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find(([key]) => key === value)?.[1] ?? "Новые";

  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => { if (box.current && !box.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);

  function toggle() {
    setCursor(Math.max(0, OPTIONS.findIndex(([key]) => key === value)));
    setOpen((v) => !v);
  }

  function pick(key: SortMode) { onChange(key); setOpen(false); }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") return setOpen(false);
    if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) { event.preventDefault(); return toggle(); }
    if (!open) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setCursor((c) => Math.min(c + 1, OPTIONS.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); pick(OPTIONS[cursor][0]); }
  }

  return (
    <div className={`sort-dropdown ${open ? "open" : ""}`} ref={box} onKeyDown={onKey}>
      <button type="button" className="sort-trigger" onClick={toggle} aria-haspopup="listbox" aria-expanded={open} aria-label={`Сортировка: ${current}`}>
        <span>{current}</span><Chevron />
      </button>
      {open && (
        <ul className="sort-menu" role="listbox" aria-label="Сортировка">
          {OPTIONS.map(([key, label], index) => (
            <li key={key} role="option" aria-selected={key === value} className={`${key === value ? "selected" : ""} ${index === cursor ? "active" : ""}`} onMouseEnter={() => setCursor(index)} onClick={() => pick(key)}>
              {label}
              {key === value && <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12.5 10 17 19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
