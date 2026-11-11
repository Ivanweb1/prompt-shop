import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import { Track } from "@/components/Track";
import { CourseHero } from "@/components/course/CourseHero";
import { DemoVideo } from "@/components/course/DemoVideo";
import { ReviewVideo } from "@/components/course/ReviewVideo";
import { seller } from "@/data/seller";
import "./course.css";

export const metadata: Metadata = {
  title: "Вау-сайты через Claude Code — курс Ивана Панькина",
  description: "Видеокурс: делайте сайты с вау-эффектом через Claude Code за 1–2 дня — от установки до сдачи клиенту",
};

const tg = `https://t.me/${seller.telegram.replace("@", "")}`;

const demos = [
  { slug: "mirra", name: "MIRRA", niche: "Парфюм", wow: "Флакон собирается при прокрутке: капля → флакон → ноты → подиум", url: "https://ivanweb1.github.io/perfume-wow-demo/" },
  { slug: "kaffa", name: "KAFFA", niche: "Магазин кофе", wow: "Сцены сменяют друг друга при прокрутке: зёрна → помол → пролив → глоток", url: "https://ivanweb1.github.io/kaffa-wow-demo/" },
  { slug: "zerno", name: "Зерно", niche: "Кофейня", wow: "Выбираешь напиток — и весь сайт перекрашивается под него", url: "https://ivanweb1.github.io/coffee-wow-demo/" },
  { slug: "orient", name: "Ориентир", niche: "Жилой комплекс", wow: "Экран-дашборд ЖК: день сменяется вечером, в окнах загорается свет", url: "" },
];

const steps = [
  ["Референс", "Находим вау-сайт или шот на Pinterest и Dribbble и раскладываем его на блоки"],
  ["Кадры и видео", "Генерируем фото продукта и переходы между ними в нейросети"],
  ["Сборка", "Claude Code собирает сайт по обычным фразам — код пишет он"],
  ["Правки", "«Сделай кнопку крупнее», «замени шрифт» — тоже словами"],
  ["Запуск", "Выкладываем на GitHub Pages или переносим на Тильду и WordPress"],
];

const audience = [
  ["Веб-дизайнер", "Рисуете в Фигме и ждёте верстальщика. Начнёте сдавать готовые сайты сами — и быстрее"],
  ["Тильдер", "Упёрлись в шаблоны и Zero-блок. Сделаете эффекты, которых нет в конструкторе, и перенесёте их на Тильду"],
  ["Новичок без кода", "Ничего не нужно знать заранее: установка — одной фразой, дальше по шагам"],
  ["Фрилансер", "Хотите поднять чек. Вау-сайт продаётся дороже шаблонного и выделяет вас среди других исполнителей"],
];

const modules = [
  { title: "Установка и первый сайт", ready: true, lessons: ["Сколько стоит и как оплатить: Claude Pro и VPN", "Ставим приложение Claude и папку проекта", "Git, Node.js и GitHub — одной фразой", "Первая страница за одну фразу"] },
  { title: "Прототип → дизайн", ready: true, lessons: ["Материалы клиента в папку проекта и Ч/Б-прототип", "Дизайн на реальном проекте — подробно, шаг за шагом", "Модели, контекст и память: когда начинать новый чат"] },
  { title: "Запуск и правки", ready: false, lessons: ["Сайт в интернете на GitHub Pages, закрытый от поисковиков", "Формы заявок", "Правки от клиента"] },
  { title: "Перенос и сдача", ready: false, lessons: ["Перенос на Тильду через Vibe-блоки", "Перенос на WordPress", "Как сдать проект и назвать цену"] },
];

// Отзывы, фото и скрины — со страницы курса по веб-дизайну ivan-web.online
const reviews = [
  { name: "Ангелина", avatar: "avatar-angelina", video: "dD8dMa1Gsbw6FgLZSxtr95", ratio: "9 / 16", text: "Курс Ивана помогает структурировать знания в веб-дизайне: понятное обучение, практика и поддержка" },
  { name: "Эльвира", avatar: "avatar-elvira", video: "fkFdwHWVZNseCYqwn8HAwZ", ratio: "1 / 1", text: "Работа с Иваном дала мне коммерческий опыт, реальные проекты для портфолио и уверенность в дальнейшей работе" },
];
const orders = Array.from({ length: 8 }, (_, i) => ({ src: asset(`/course/reviews/order-${i + 1}.webp`), alt: `Заявка на сайт из чата ${i + 1}` }));
const vacancies = [
  ["vacancy-1", "Ведущий веб-дизайнер UX/UI — 120–150 тыс. ₽"],
  ["vacancy-2", "UX/UI дизайнер — до 180 тыс. ₽"],
  ["vacancy-3", "Веб-дизайнер — 100–150 тыс. ₽"],
  ["vacancy-4", "Веб-дизайнер (middle) — от 100 тыс. ₽"],
];
const tariffs = [
  { slug: "course-record", name: "Запись курса", tag: "Самостоятельно", price: "9 990 ₽", features: ["4 модуля видеоуроков", "Фразы к каждому уроку — копируете и работаете", "Демо-проекты из витрины для разбора"] },
  { slug: "course-feedback", name: "С обратной связью", tag: "Лично от Ивана", featured: true, price: "29 990 ₽", features: ["Всё из тарифа «Запись курса»", "Обратная связь лично от Ивана по вашему проекту", "Ответы на вопросы по ходу курса"] },
];

const faq = [
  ["Нужно ли знать код?", "Нет. Вы пишете Claude обычными фразами, код он пишет сам. Даже установку всех программ в первом модуле делаем одной фразой"],
  ["Сколько стоят инструменты?", "Подписка Claude Pro — около 2 100 ₽ в месяц, VPN — около 200 ₽. В первом уроке показываю, где и как оплатить"],
  ["Видео для сайтов — это дорого?", "Картинки можно сгенерировать бесплатно. Ролик-переход в Kling стоит около 30 кредитов за 5 секунд — на один сайт обычно хватает трёх"],
  ["Я работаю на Тильде. Мне подойдёт?", "Да. Отдельный модуль — как перенести сайт на Тильду через Vibe-блоки, так что клиент сможет править его в привычной админке"],
  ["Сколько длится курс?", "4 модуля, около 3–4 часов видео. Смотреть можно в своём темпе"],
  ["Сайты из витрины сделаны для реальных клиентов?", "Нет, это демо-проекты с вымышленными брендами — их можно спокойно открыть и разобрать. Клиентские сайты собираются тем же способом"],
];

export default function CoursePage() {
  return (
    <div className="course">
      <CourseHero />

      <section className="section c-showcase" id="demos"><div className="container">
        <div className="section-heading"><div><div className="descriptor">ВИТРИНА</div><h2>Такие сайты вы научитесь<br /><span className="highlight">делать сами</span></h2></div><p>Каждый собран с ИИ по тому же пути, что в курсе: референс → кадры → видео → сайт. Откройте любой и полистайте — бренды вымышленные</p></div>
        <div className="c-demos">
          {demos.map((d) => {
            const inner = <>
              <div className="c-demo-screen">
                <DemoVideo src={asset(`/course/demo-${d.slug}.mp4`)} poster={asset(`/course/demo-${d.slug}.jpg`)} label={`Запись демо-сайта ${d.name}`} />
              </div>
              <div className="c-demo-info">
                <div><span className="c-demo-niche">{d.niche}</span><strong>{d.name}</strong><p>{d.wow}</p></div>
                {d.url ? <span className="c-demo-open">Открыть сайт <Chevron /></span> : <span className="c-demo-open">Демо-экран</span>}
              </div>
            </>;
            return d.url
              ? <a key={d.slug} href={d.url} target="_blank" rel="noreferrer" className="c-demo">{inner}</a>
              : <div key={d.slug} className="c-demo">{inner}</div>;
          })}
        </div>
      </div></section>

      <section className="section c-how" id="how"><div className="container">
        <div className="section-heading centered"><div className="descriptor">КАК ЭТО УСТРОЕНО</div><h2>1–2 дня <span className="highlight">вместо недель</span></h2><p>Один человек ведёт весь сайт: от референса до ссылки для клиента</p></div>
        <ol className="c-steps">
          {steps.map(([title, text], i) => (
            <li key={title}><span>{String(i + 1).padStart(2, "0")}</span><b>{title}</b><p>{text}</p></li>
          ))}
        </ol>
        <div className="c-compare">
          <div className="c-compare-old"><small>Обычно</small><b>Фигма → верстальщик → круги правок</b><p>Недели согласований, два исполнителя и вау-эффекты, которые «сложно сверстать»</p></div>
          <div className="c-compare-new"><Track className="c-compare-track" rings={5} /><small>С Claude Code</small><b>Вы и Claude</b><p>1–2 дня на сайт, эффекты собираются фразами, правки — за минуты</p></div>
        </div>
      </div></section>

      <section className="section c-audience"><div className="container">
        <div className="section-heading"><div><div className="descriptor">ДЛЯ КОГО</div><h2>Курс для вас, <span className="highlight">если вы</span></h2></div><p>Опыт в дизайне поможет, но не обязателен</p></div>
        <div className="c-cards">
          {audience.map(([title, text], i) => <div className="c-card" key={title}><span>/{String(i + 1).padStart(2, "0")}</span><b>{title}</b><p>{text}</p></div>)}
        </div>
      </div></section>

      <section className="section c-program" id="program"><div className="container">
        <div className="section-heading"><div><div className="descriptor">ПРОГРАММА</div><h2>4 модуля —<br /><span className="highlight">от установки до сдачи</span></h2></div><p>Короткие видеоуроки с реальным интерфейсом Claude и фразами, которые можно скопировать</p></div>
        <div className="c-modules">
          {modules.map((m, i) => (
            <details key={m.title} open={i === 0}>
              <summary><span className="c-mod-num">Модуль {i + 1}</span><b>{m.title}</b><em className={m.ready ? "ready" : ""}>{m.ready ? "Записан" : "В записи"}</em><i aria-hidden>+</i></summary>
              <ol>{m.lessons.map((l, j) => <li key={l}><span>Урок {j + 1}</span>{l}</li>)}</ol>
            </details>
          ))}
        </div>
      </div></section>

      <section className="section about-section" id="author"><div className="container about-grid">
        <div className="about-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="about-photo" src={asset("/brand/ivan-about.jpg")} alt="Иван Панькин" width={510} height={640} />
          <div className="about-glass"><b>Иван Панькин</b><span>Автор курса · веб-дизайнер</span></div>
        </div>
        <div className="about-copy"><div className="descriptor">АВТОР</div><h2>Иван Панькин<br /><span className="highlight">арт-директор</span></h2><p className="about-lead">Больше четырёх лет в веб-дизайне, больше 100 сайтов для клиентов. Сейчас собираю сайты через Claude Code — и показываю в курсе, как именно</p><p>Через сайты, которые я сделал, клиенты заработали больше 500 млн ₽. Веду Instagram на 17 тысяч дизайнеров и Telegram-канал</p><div className="about-facts"><span><b>100+</b>сайтов</span><span><b>500 млн</b>выручки клиентов</span><span><b>17к+</b>в Instagram</span></div></div>
      </div></section>

      <section className="section c-reviews" id="reviews"><div className="container">
        <div className="section-heading"><div><div className="descriptor">ОТЗЫВЫ</div><h2>Ученики моего курса<br /><span className="highlight">по веб-дизайну</span></h2></div><p>Курс по Claude Code новый — здесь отзывы, переписки и работы учеников моего первого курса</p></div>

        <article className="c-alex">
          <div className="c-alex-story">
            <div className="c-person">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/course/reviews/avatar-alexander.webp")} alt="Александр" width={72} height={72} />
              <div><b>Александр</b><span>Ученик курса по веб-дизайну</span></div>
            </div>
            <dl>
              <div><dt>До</dt><dd>Работал на обычной офлайн-работе, с веб-дизайном связан не был</dd></div>
              <div><dt>На обучении</dt><dd>Освоил Figma и Tilda, собрал 3 учебные работы, поработал над коммерческим проектом</dd></div>
              <div><dt>Результат</dt><dd>Первый заказ — многостраничный сайт за 30 000 ₽, обучение окупилось сразу. Сейчас заработал больше 100 000 ₽</dd></div>
            </dl>
          </div>
          <div className="c-alex-shots">
            <figure className="c-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/course/reviews/alex-review.webp")} alt="Отзыв Александра о курсе в переписке" loading="lazy" />
              <figcaption>Отзыв Александра</figcaption>
            </figure>
          </div>
        </article>

        <div className="c-video-reviews">
          {reviews.map((r) => (
            <article key={r.name} className="c-vreview">
              <div className="c-person">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(`/course/reviews/${r.avatar}.webp`)} alt={r.name} width={72} height={72} loading="lazy" />
                <div><b>{r.name}</b><span>Ученица курса по веб-дизайну</span></div>
              </div>
              <p>«{r.text}»</p>
              <ReviewVideo id={r.video} name={r.name} ratio={r.ratio} />
            </article>
          ))}
        </div>
      </div></section>

      <section className="section c-demand"><div className="container">
        <div className="section-heading"><div><div className="descriptor">СПРОС</div><h2>Сайты нужны <span className="highlight">каждый день</span></h2></div><p>Скрины вакансий и заявок на сайты из чатов. Работа есть и в найме, и на фрилансе</p></div>
        <div className="c-demand-grid">
          <div className="c-demand-col">
            <div className="c-subhead"><b>Вакансии</b><span>100 000–180 000 ₽ на руки</span></div>
            <div className="c-vacancies">
              {vacancies.map(([file, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={file} src={asset(`/course/reviews/${file}.webp`)} alt={alt} loading="lazy" />
              ))}
            </div>
          </div>
          <div className="c-demand-col c-orders">
            <div className="c-subhead"><b>Заявки на сайты</b><span>из чатов с заказами</span></div>
            <div className="c-orders-window">
              <div className="c-orders-track">
                {[...orders, ...orders].map((o, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={o.src} alt={i < orders.length ? o.alt : ""} aria-hidden={i >= orders.length} loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div></section>

      <section className="section c-tariffs" id="start"><div className="container">
        <div className="section-heading centered"><div className="descriptor">ТАРИФЫ</div><h2>Два формата <span className="highlight">участия</span></h2><p>Оплата картой или по СБП через ЮKassa. После оплаты пришлю доступ в Telegram</p></div>
        <div className="c-tariff-grid">
          {tariffs.map((t) => (
            <div key={t.name} className={`c-tariff ${t.featured ? "featured" : ""}`}>
              {t.featured && <Track className="c-price-track" rings={6} />}
              <span className="c-tariff-tag">{t.tag}</span>
              <h3>{t.name}</h3>
              <ul>{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="c-tariff-price"><b>{t.price}</b></div>
              <Link className={`button button-wide ${t.featured ? "button-light" : "button-dark"}`} href={`/checkout/?type=product&item=${t.slug}`}>Оплатить {t.price} <span aria-hidden><Chevron /></span></Link>
            </div>
          ))}
        </div>
        <div className="c-need">
          <b>Что нужно для старта</b>
          <span><i>Компьютер</i>Windows или Mac</span>
          <span><i>Claude Pro</i>≈ 2 100 ₽ в месяц</span>
          <span><i>VPN</i>≈ 200 ₽ в месяц</span>
          <span><i>Код</i>знать не нужно</span>
        </div>
      </div></section>

      <section className="section faq-section" id="faq"><div className="container faq-grid"><div><div className="descriptor">FAQ</div><h2>Частые <span className="highlight">вопросы</span></h2><p>Если ответа здесь нет, напишите в Telegram</p><a className="button button-dark" href={tg} target="_blank" rel="noreferrer">Написать в Telegram <span aria-hidden><Chevron /></span></a></div><div className="faq-list">{faq.map(([q, a], i) => <details key={q} open={i === 0}><summary><span>{String(i + 1).padStart(2, "0")}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></div></section>

      <section className="c-final"><div className="container">
        <div className="c-final-card">
          <h2>Следующий вау-сайт<br />можете сделать <span className="highlight">вы</span></h2>
          <div className="c-final-actions">
            <a className="button button-light" href={tg} target="_blank" rel="noreferrer">Хочу на курс <span aria-hidden><Chevron /></span></a>
            <Link className="c-link light" href="#demos">Ещё раз посмотреть примеры</Link>
          </div>
        </div>
      </div></section>
    </div>
  );
}
