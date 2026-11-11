import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import { Track } from "@/components/Track";
import { ScrollHero } from "@/components/course/ScrollHero";
import { DemoVideo } from "@/components/course/DemoVideo";
import { PromptDemo } from "@/components/course/PromptDemo";
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

const reviews = [
  { name: "Ангелина", text: "Курс Ивана помогает структурировать знания в веб-дизайне: понятное обучение, практика и поддержка" },
  { name: "Эльвира", text: "Работа с Иваном дала мне коммерческий опыт, реальные проекты для портфолио и уверенность в дальнейшей работе" },
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
      <ScrollHero />

      <section className="section c-showcase" id="demos"><div className="container">
        <div className="section-heading"><div><div className="descriptor">ВИТРИНА</div><h2>Вот что вы будете<br /><span className="highlight">делать</span></h2></div><p>Живые сайты — откройте любой и полистайте. Бренды вымышленные, сделано с ИИ</p></div>
        <div className="c-demos">
          {demos.map((d, i) => (
            <a key={d.slug} href={d.url} target="_blank" rel="noreferrer" className={`c-demo ${i === 0 ? "wide" : ""}`}>
              <div className="c-demo-screen">
                <DemoVideo src={asset(`/course/demo-${d.slug}.mp4`)} poster={asset(`/course/demo-${d.slug}.jpg`)} label={`Запись демо-сайта ${d.name}`} />
              </div>
              <div className="c-demo-info">
                <div><span className="c-demo-niche">{d.niche}</span><strong>{d.name}</strong><p>{d.wow}</p></div>
                <span className="c-demo-open">Открыть сайт <Chevron /></span>
              </div>
            </a>
          ))}
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

      <section className="section c-try" id="try"><div className="container c-try-grid">
        <div><div className="descriptor">ПОПРОБУЙТЕ</div><h2>Опишите сайт —<br /><span className="highlight">получите план</span></h2><p className="c-lead">Так выглядит начало работы: вы пишете задачу словами, Claude раскладывает её на шаги и собирает</p></div>
        <PromptDemo />
      </div></section>

      <section className="section c-money"><div className="container">
        <div className="c-money-card">
          <div><div className="descriptor light-muted">ПРИМЕР РАСЧЁТА</div><h2>Два сайта в месяц —<br />уже <span className="highlight">200 000 ₽</span></h2><p>При чеке от 100 000 ₽ за вау-сайт. Это пример расчёта, а не обещание дохода: всё зависит от того, как вы ищете клиентов</p></div>
          <dl>
            <div><dt>Сайтов в месяц</dt><dd>2</dd></div>
            <div><dt>Чек</dt><dd>от 100 000 ₽</dd></div>
            <div><dt>Инструменты в месяц</dt><dd>≈ 2 300 ₽</dd></div>
          </dl>
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

      <section className="section c-reviews"><div className="container">
        <div className="section-heading"><div><div className="descriptor">ОТЗЫВЫ</div><h2>Ученики моего курса<br /><span className="highlight">по веб-дизайну</span></h2></div><p>Курс по Claude Code новый — здесь отзывы с моего первого курса</p></div>
        <div className="c-review-grid">
          <article className="c-case">
            <span className="c-case-tag">Кейс ученика</span>
            <h3>Александр</h3>
            <dl>
              <div><dt>До</dt><dd>Работал на обычной офлайн-работе, с веб-дизайном связан не был</dd></div>
              <div><dt>На обучении</dt><dd>Освоил Figma и Tilda, собрал 3 учебные работы, поработал над коммерческим проектом</dd></div>
              <div><dt>Результат</dt><dd>Первый заказ — многостраничный сайт за 30 000 ₽, обучение окупилось сразу. Сейчас заработал больше 100 000 ₽</dd></div>
            </dl>
          </article>
          {reviews.map((r) => <blockquote key={r.name} className="c-quote"><p>«{r.text}»</p><cite>{r.name}</cite></blockquote>)}
        </div>
      </div></section>

      <section className="section c-start" id="start"><div className="container c-start-grid">
        <div className="c-start-need">
          <div className="descriptor">ЧТО НУЖНО ДЛЯ СТАРТА</div>
          <h2>Компьютер<br />и <span className="highlight">≈ 2 300 ₽</span> в месяц</h2>
          <ul>
            <li><b>Компьютер</b>Windows или Mac</li>
            <li><b>Claude Pro</b>≈ 2 100 ₽ в месяц</li>
            <li><b>VPN</b>≈ 200 ₽ в месяц</li>
            <li><b>Код</b>знать не нужно</li>
          </ul>
        </div>
        <div className="c-price">
          <Track className="c-price-track" rings={6} />
          <div className="descriptor light-muted">УЧАСТИЕ</div>
          <h3>Вау-сайты через Claude Code</h3>
          <ul>
            <li>4 модуля видеоуроков</li>
            <li>Фразы к каждому уроку — копируете и работаете</li>
            <li>Демо-проекты из витрины для разбора</li>
          </ul>
          <p className="c-price-note">Цена и дата старта появятся здесь. Напишите в Telegram — пришлю первым</p>
          <a className="button button-light button-wide" href={tg} target="_blank" rel="noreferrer">Хочу на курс <span aria-hidden><Chevron /></span></a>
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
