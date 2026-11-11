import Link from "next/link";
import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import { DemoVideo } from "@/components/course/DemoVideo";

// Первый экран курса: текст слева, справа небольшое зацикленное превью демо-сайта MIRRA
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
          <a className="c-hero-preview" href="https://ivanweb1.github.io/perfume-wow-demo/" target="_blank" rel="noreferrer">
            <div className="c-browser">
              <div className="c-browser-bar"><i /><i /><i /><span>mirra · демо</span></div>
              <DemoVideo src={asset("/course/demo-mirra.mp4")} poster={asset("/course/demo-mirra.jpg")} label="Запись демо-сайта MIRRA" />
            </div>
            <div className="c-hero-caption"><span><b>MIRRA</b> · бренд вымышленный, сделано с ИИ</span><span>Открыть <Chevron /></span></div>
          </a>
        </div>
      </div>
    </section>
  );
}
