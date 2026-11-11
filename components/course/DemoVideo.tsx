"use client";

import { useEffect, useRef } from "react";

// Ролик играет, только пока карточка на экране — не грузим всё сразу
export function DemoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.35 });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} className="c-demo-video" src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />;
}
