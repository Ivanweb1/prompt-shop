// Бесконечная лента картинок: список дублируется, CSS двигает его по кругу
export function Marquee({ items, className = "", speed = 60 }: { items: { src: string; alt: string }[]; className?: string; speed?: number }) {
  const row = [...items, ...items];
  return (
    <div className={`c-marquee ${className}`} style={{ ["--c-speed" as string]: `${speed}s` }}>
      <div className="c-marquee-track">
        {row.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={item.src} alt={i < items.length ? item.alt : ""} aria-hidden={i >= items.length} loading="lazy" decoding="async" />
        ))}
      </div>
    </div>
  );
}
