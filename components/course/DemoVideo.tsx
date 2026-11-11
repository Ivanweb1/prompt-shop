"use client";

import { useEffect, useRef } from "react";

// Зацикленное превью сайта: играет постоянно, без звука
export function DemoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  // некоторые браузеры игнорируют autoPlay до первого кадра — запускаем вручную
  useEffect(() => { ref.current?.play().catch(() => {}); }, []);

  return <video ref={ref} className="c-demo-video" src={src} poster={poster} autoPlay muted loop playsInline preload="auto" aria-label={label} />;
}
