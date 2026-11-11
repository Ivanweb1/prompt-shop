"use client";

import { useEffect, useState } from "react";

// Кнопка «Смотреть видеоотзыв» — плеер Kinescope открывается во всплывающем окне
export function ReviewVideo({ id, name, ratio }: { id: string; name: string; ratio: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button type="button" className="c-play" onClick={() => setOpen(true)}>
        <span aria-hidden><svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
        Смотреть видеоотзыв
      </button>
      {open && (
        <div className="c-modal" role="dialog" aria-modal="true" aria-label={`Видеоотзыв: ${name}`} onClick={() => setOpen(false)}>
          <div className="c-modal-box" style={{ aspectRatio: ratio }} onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://kinescope.io/embed/${id}?autoplay=1`} title={`Видеоотзыв: ${name}`} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen />
            <button type="button" className="c-modal-close" onClick={() => setOpen(false)} aria-label="Закрыть">×</button>
          </div>
        </div>
      )}
    </>
  );
}
