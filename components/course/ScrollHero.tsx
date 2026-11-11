"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";

// Кадры демо-сайта MIRRA: капля → флакон → ноты → подиум. Прокрутка листает кадры.
const FRAMES = 121;
const BG = "#EFE6DA";
const frameSrc = (i: number) => asset(`/course/seq/${String(i).padStart(3, "0")}.webp`);

const STAGES = [
  { kicker: "Курс · Claude Code", title: <>Вау-сайты<br />через <span className="highlight">Claude Code</span></>, text: "Сайты, которые хочется листать. Без верстальщика и без знания кода" },
  { kicker: "Скорость", title: <><span className="highlight">1–2 дня</span><br />на один сайт</>, text: "От референса до готового сайта в интернете — вместо недель в Фигме и переписки с верстальщиком" },
  { kicker: "Деньги", title: <>Чек<br /><span className="highlight">от 100 000 ₽</span></>, text: "Такие сайты продаются дороже шаблонных — заказчик видит вау-эффект с первого экрана" },
  { kicker: "Курс", title: <>Научу делать<br /><span className="highlight">такие же</span></>, text: "Пошагово, на реальных проектах: от установки до сдачи сайта клиенту" },
];

export function ScrollHero() {
  const wrap = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cv = canvas.current, box = wrap.current;
    if (!cv || !box) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let current = 0, raf = 0;

    const draw = (index: number) => {
      // ближайший уже загруженный кадр, пока остальные догружаются
      let img: HTMLImageElement | undefined;
      for (let d = 0; d < FRAMES && !img; d++) {
        const a = images.current[index - d], b = images.current[index + d];
        img = a?.complete && a.naturalWidth ? a : b?.complete && b.naturalWidth ? b : undefined;
      }
      const w = cv.width, h = cv.height;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      if (!img) return;
      const ratio = img.naturalWidth / img.naturalHeight;
      const mobile = w / h < 1;
      // на компьютере флакон смещён вправо от текста, на телефоне — под текстом
      const dh = mobile ? Math.min(h * 0.68,(w * 1.5) / ratio) : h;
      const dw = dh * ratio;
      const x = mobile ? (w - dw) / 2 : w * 0.64 - dw / 2;
      const y = mobile ? h - dh : 0;
      ctx.drawImage(img, x, y, dw, dh);
      // мягко растворяем край кадра в фоне
      const fade = ctx.createLinearGradient(x, 0, x + dw * 0.18, 0);
      fade.addColorStop(0, BG); fade.addColorStop(1, "rgba(239,230,218,0)");
      ctx.fillStyle = fade; ctx.fillRect(x, y, dw * 0.18, dh);
      if (mobile) {
        const top = ctx.createLinearGradient(0, y, 0, y + dh * 0.2);
        top.addColorStop(0, BG); top.addColorStop(1, "rgba(239,230,218,0)");
        ctx.fillStyle = top; ctx.fillRect(0, y, w, dh * 0.2);
      }
    };

    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      draw(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = box.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
        current = Math.round(p * (FRAMES - 1));
        draw(current);
        setProgress(p);
        setStage(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length * 0.999)));
      });
    };

    // сначала каждый восьмой кадр, потом остальные — первый экран оживает быстро
    const order = [...Array(FRAMES).keys()].sort((a, b) => (a % 8 === 0 ? 0 : 1) - (b % 8 === 0 ? 0 : 1) || a - b);
    order.forEach((i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { if (Math.abs(i - current) < 8) draw(current); };
      img.src = frameSrc(i);
      images.current[i] = img;
    });

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="c-hero" ref={wrap} aria-label="Курс «Вау-сайты через Claude Code»">
      <div className="c-hero-sticky">
        <div className="container c-hero-frame">
          <div className="c-hero-stage">
            <canvas ref={canvas} className="c-hero-canvas" aria-hidden />
            <div className="c-hero-copy">
              {STAGES.map((s, i) => (
                <div key={i} className={`c-hero-slide ${i === stage ? "on" : ""}`} aria-hidden={i !== stage}>
                  <div className="descriptor">{s.kicker}</div>
                  {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                  <p>{s.text}</p>
                  {i === STAGES.length - 1 && (
                    <div className="c-hero-actions">
                      <Link className="button button-blue" href="#program" tabIndex={i === stage ? 0 : -1}>Программа курса <span aria-hidden><Chevron /></span></Link>
                      <Link className="c-link" href="#start" tabIndex={i === stage ? 0 : -1}>Как попасть на курс</Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="c-hero-meter" aria-hidden>
              {STAGES.map((_, i) => <i key={i} className={i <= stage ? "on" : ""} />)}
              <span>{stage < STAGES.length - 1 ? "Листайте — сайт оживает" : "Это кадры демо-сайта MIRRA"}</span>
            </div>
            <div className="c-hero-note">Демо MIRRA · бренд вымышленный · сделано с ИИ</div>
            <div className="c-hero-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
