import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import Image from "next/image";
import Link from "next/link";
import { Catalog } from "@/components/Catalog";
import { Track } from "@/components/Track";
import { HeroPreviews } from "@/components/HeroPreviews";
import { bundles } from "@/data/bundles";
import { categories, formatPrice, products } from "@/data/products";

const bundle = bundles[0];
const bundleProducts = bundle ? products.filter((item) => bundle.productSlugs.includes(item.slug)) : [];
const bundleDiscount = bundle ? Math.round((1 - bundle.price / bundle.oldPrice) * 100) : 0;
const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10, m100 = n % 100;
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
};
const categoryTones = ["", "cat-sky", "", "cat-deep", "", ""];

const faq = [
  ["Что такое промпт и как его использовать", "Промпт — это готовая инструкция для нейросети. Вы подставляете свои вводные, запускаете её в указанном сервисе и получаете структурированный результат"],
  ["Как я получу материал", "Сразу после оплаты на email придёт письмо со ссылкой на скачивание. Ссылка работает 30 дней"],
  ["Подойдут ли материалы для моей нейросети", "На каждой странице указана совместимость. Большинство текстовых материалов можно использовать в Claude, ChatGPT и Gemini"],
  ["Можно ли вернуть цифровой товар", "Условия возврата будут закреплены в итоговой оферте до запуска продаж. Сейчас юридические страницы содержат текст-плейсхолдер"],
  ["Как защищена оплата", "Оплата проходит на защищённой странице ЮKassa: карта, СБП, SberPay или T-Pay. Данные карты магазин не получает и не хранит"],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-stage">
            <span className="hero-glow" aria-hidden />
            <div className="hero-copy">
              <div className="descriptor light-muted">МАГАЗИН ИВАНА ПАНЬКИНА</div>
              <h1>
                <span className="line">Рабочие материалы</span>
                <span className="line">для дизайна <span className="highlight">с AI</span></span>
              </h1>
              <div className="hero-actions"><Link className="button button-light" href="#catalog">Смотреть каталог <span aria-hidden><Chevron /></span></Link><span className="hero-caption">{products.length} {plural(products.length, "материал", "материала", "материалов")}<br />в каталоге</span></div>
            </div>
            <HeroPreviews />
          </div>

          <div className="hero-panel" aria-label="Категории">
            <div className="hero-intro">
              <div className="descriptor">КАТЕГОРИИ</div>
              <div><h2>От идеи до готового результата</h2><p>Промпты, инструкции, скиллы и гайды, которые помогают пройти путь от идеи до готового результата</p></div>
            </div>
            {categories.slice(1).map((item, index) => (
              <a href="#catalog" className={`cat-card ${categoryTones[index]}`} key={item.name}>
                {categoryTones[index] && <Track className="cat-track" />}
                <span className="cat-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.count} {plural(item.count, "материал", "материала", "материалов")}</span></span>
                <strong>{item.name}</strong>
                <span className="cat-arrow" aria-hidden><Chevron /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {bundle && <section className="section bundle-section" id="bundles"><div className="container">
        <div className="section-heading centered"><div className="descriptor">КОМПЛЕКТОМ ВЫГОДНЕЕ</div><h2>Три шага в одном <span className="highlight">наборе</span></h2><p>Материалы дополняют друг друга и стоят выгоднее вместе</p></div>
        <div className="bundle-layout">
          <ol className="bundle-steps">
            {bundleProducts.map((item, index) => (
              <li key={item.slug} className={index === 0 ? "active" : ""}>
                <Link href={`/product/${item.slug}`}><b>{item.title}</b><small>{String(index + 1).padStart(2, "0")} · {item.category}</small></Link>
              </li>
            ))}
          </ol>
          <Link href={`/bundle/${bundle.slug}`} className="bundle-stage">
            <Track className="bundle-track" rings={6} />
            <span className="bundle-hatch" aria-hidden />
            <div className="bundle-glass">
              <span className="bundle-label">Комплект · −{bundleDiscount}%</span>
              <h3>{bundle.title}</h3>
              <p>{bundle.description}</p>
              <em>Подробнее <Chevron /></em>
            </div>
            <dl className="bundle-stats">
              <div><dt>Материалов</dt><dd>{bundleProducts.length}</dd></div>
              <div><dt>Скидка</dt><dd>−{bundleDiscount}%</dd></div>
              <div><dt>Цена</dt><dd>{formatPrice(bundle.price)}<s>{formatPrice(bundle.oldPrice)}</s></dd></div>
            </dl>
          </Link>
        </div>
      </div></section>}

      <Catalog products={products} />

      <section className="section about-section" id="about"><div className="container about-grid">
        <div className="about-visual">
          <Track className="about-track" rings={6} />
          <Image className="about-logo" src={asset("/brand/logo-mark-inverse.svg")} alt="" width={160} height={160} />
          <div className="about-glass"><b>Иван Панькин</b><span>Арт-директор · веб-дизайн</span></div>
        </div>
        <div className="about-copy"><div className="descriptor">ОБ АВТОРЕ</div><h2>Иван Панькин<br /><span className="highlight">арт-директор</span></h2><p className="about-lead">Работаю в веб-дизайне больше четырёх лет и участвовал более чем в 100 проектах</p><p>Исследую, как Figma, Tilda и AI-инструменты помогают дизайнерам собирать сильные решения и выстраивать понятный процесс работы</p><div className="about-facts"><span><b>4+</b>лет в дизайне</span><span><b>100+</b>проектов</span><span><b>AI</b>в рабочем процессе</span></div></div>
      </div></section>

      <section className="section faq-section" id="faq"><div className="container faq-grid"><div><div className="descriptor">FAQ</div><h2>Коротко о <span className="highlight">главном</span></h2><p>Если ответа здесь нет, напишите в Telegram</p><a className="button button-dark" href="https://t.me/" target="_blank" rel="noreferrer">Написать в Telegram <span aria-hidden><Chevron /></span></a></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></div></section>
    </>
  );
}
