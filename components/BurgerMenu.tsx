"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeaderSearch } from "./HeaderSearch";

const LINKS = [
  ["/#catalog", "Каталог"],
  ["/#about", "Об авторе"],
  ["/#faq", "FAQ"],
  ["/cart/", "Корзина"],
];

export function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => { if (box.current && !box.current.contains(event.target as Node)) setOpen(false); };
    const esc = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", outside); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className="burger" ref={box}>
      <button type="button" className={`burger-button ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
        <i /><i />
      </button>
      {open && (
        <div className="burger-panel">
          <HeaderSearch className="search-in-menu" onNavigate={() => setOpen(false)} />
          <nav aria-label="Основная навигация">
            {LINKS.map(([href, label], index) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
