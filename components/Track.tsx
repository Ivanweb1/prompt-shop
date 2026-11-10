// Декоративный «трек» — вложенные скруглённые контуры, как в референсе
export function Track({ className = "", rings = 5 }: { className?: string; rings?: number }) {
  return (
    <svg className={className} viewBox="0 0 400 200" fill="none" aria-hidden>
      {Array.from({ length: rings }, (_, i) => {
        const inset = 4 + i * 14;
        const h = 200 - inset * 2;
        return <rect key={i} x={inset} y={inset} width={400 - inset * 2} height={h} rx={h / 2} stroke="currentColor" strokeWidth="1.4" />;
      })}
    </svg>
  );
}
