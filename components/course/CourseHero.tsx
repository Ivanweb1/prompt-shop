import Link from "next/link";
import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import { DemoVideo } from "@/components/course/DemoVideo";

// Сайты, которые ученики научатся делать: бесконечная вертикальная лента справа
const REEL = [
  { slug: "mirra", name: "MIRRA", niche: "парфюм" },
  { slug: "kaffa", name: "KAFFA", niche: "магазин кофе" },
  { slug: "orient", name: "Ориентир", niche: "жилой комплекс" },
  { slug: "zerno", name: "Зерно", niche: "кофейня" },
];

export function CourseHero() {
  return (
    <section className="c-hero">
      <div className="container">
        <div className="c-hero-stage">
          <span className="c-hero-glow" aria-hidden />
          <div className="c-hero-copy">
            <div className="descriptor light-muted">Курс · Claude Code</div>
            <h1>Вау-сайты<br />через <span className="highlight">Claude Code</span></h1>
            <p>Сайты, которые хочется листать. Без верстальщика и без знания кода</p>
            <div className="c-hero-facts">
              <span><b>1–2 дня</b>на один сайт</span>
              <span><b>от 100 000 ₽</b>чек за проект</span>
              <span><b>Без кода</b>пишете фразами</span>
            </div>
            <div className="c-hero-actions">
              <Link className="button button-light" href="#program">Программа курса <span aria-hidden><Chevron /></span></Link>
              <Link className="c-link light" href="#demos">Смотреть примеры</Link>
            </div>
          </div>
          <div className="c-reel" aria-label="Сайты, которые вы научитесь делать">
            <div className="c-reel-track">
              {[...REEL, ...REEL].map((d, i) => (
                <div className="c-browser" key={i} aria-hidden={i >= REEL.length}>
                  <div className="c-browser-bar"><i /><i /><i /><span>{d.name.toLowerCase()} · {d.niche}</span></div>
                  <DemoVideo src={asset(`/course/demo-${d.slug}.mp4`)} poster={asset(`/course/demo-${d.slug}.jpg`)} label={`Демо-сайт ${d.name}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
