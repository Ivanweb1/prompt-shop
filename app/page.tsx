import Image from "next/image";
import Link from "next/link";
import { Catalog } from "@/components/Catalog";
import { PreviewArt } from "@/components/PreviewArt";
import { bundles, getBundleProducts } from "@/data/bundles";
import { categories, formatPrice, products } from "@/data/products";

const bundle = bundles[0];
const bundleProducts = getBundleProducts(bundle);
const bundleDiscount = Math.round((1 - bundle.price / bundle.oldPrice) * 100);

const faq = [
  ["Что такое промпт и как его использовать", "Промпт — это готовая инструкция для нейросети. Вы подставляете свои вводные, запускаете её в указанном сервисе и получаете структурированный результат"],
  ["Как я получу материал", "После оформления заказ придёт на email. В первой версии работает демонстрационный сценарий, а автоматическая отправка появится вместе с оплатой"],
  ["Подойдут ли материалы для моей нейросети", "На каждой странице указана совместимость. Большинство текстовых материалов можно использовать в Claude, ChatGPT и Gemini"],
  ["Можно ли вернуть цифровой товар", "Условия возврата будут закреплены в итоговой оферте до запуска продаж. Сейчас юридические страницы содержат текст-плейсхолдер"],
  ["Как будет защищена оплата", "На втором этапе оплата пройдёт через ЮKassa. Данные банковской карты магазин получать и хранить не будет"],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="descriptor">МАГАЗИН ИВАНА ПАНЬКИНА</div>
            <h1>Рабочие материалы для дизайна <span className="highlight">с AI</span></h1>
            <p>Промпты, инструкции, скиллы и гайды, которые помогают пройти путь от идеи до готового результата</p>
            <div className="hero-actions"><Link className="button button-blue" href="#catalog">Смотреть каталог <span aria-hidden>↘</span></Link><span className="hero-caption">8 демо-материалов<br />для первой версии</span></div>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="giant-module module-outline" /><div className="giant-module module-solid" />
            <div className="hero-card"><div className="hero-card-top"><span>AI / DESIGN</span><span>01—08</span></div><strong>Соберите свой рабочий процесс</strong><div className="mini-modules"><i /><i /><i /><i /><i /></div></div>
          </div>
        </div>
      </section>

      <section className="categories-strip" aria-label="Категории"><div className="container categories-row">{categories.slice(1).map((item, index) => <a href="#catalog" key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><small>{item.count} {item.count === 1 ? "материал" : "материала"}</small></a>)}</div></section>

      <section className="section bundle-section" id="bundles"><div className="container">
        <div className="section-heading inverse"><div><div className="descriptor light-muted">КОМПЛЕКТОМ ВЫГОДНЕЕ</div><h2>Три шага в одном <span className="highlight">наборе</span></h2></div><p>Материалы дополняют друг друга и стоят выгоднее вместе</p></div>
        <Link href={`/bundle/${bundle.slug}`} className="bundle-card">
          <div className="bundle-info"><span className="bundle-label">Комплект · −{bundleDiscount}%</span><h3>{bundle.title}</h3><p>{bundle.description}</p><div className="bundle-products">{bundleProducts.map((item, index) => <span key={item.slug}><b>{String(index + 1).padStart(2, "0")}</b>{item.title.replace("[ДЕМО] ", "")}</span>)}</div><div className="price-row bundle-price"><strong>{formatPrice(bundle.price)}</strong><s>{formatPrice(bundle.oldPrice)}</s></div></div>
          <div className="bundle-art"><PreviewArt eyebrow="Комплект" result="Идея → сборка → проверка" dark /><span className="bundle-arrow">↘</span></div>
        </Link>
      </div></section>

      <Catalog products={products} />

      <section className="section about-section" id="about"><div className="container about-grid">
        <div className="about-mark"><Image src="/prompt-shop/brand/logo-mark-mono-graphite.svg" alt="" fill sizes="(max-width: 768px) 100vw, 40vw" /></div>
        <div className="about-copy"><div className="descriptor">ОБ АВТОРЕ</div><h2>Иван Панькин<br /><span className="highlight">арт-директор</span></h2><p className="about-lead">Работаю в веб-дизайне больше четырёх лет и участвовал более чем в 100 проектах</p><p>Исследую, как Figma, Tilda и AI-инструменты помогают дизайнерам собирать сильные решения и выстраивать понятный процесс работы</p><div className="about-facts"><span><b>4+</b>лет в дизайне</span><span><b>100+</b>проектов</span><span><b>AI</b>в рабочем процессе</span></div></div>
      </div></section>

      <section className="section faq-section" id="faq"><div className="container faq-grid"><div><div className="descriptor">FAQ</div><h2>Коротко о <span className="highlight">главном</span></h2><p>Если ответа здесь нет, напишите в Telegram</p><a className="button button-dark" href="https://t.me/" target="_blank" rel="noreferrer">Написать в Telegram <span aria-hidden>↘</span></a></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></div></section>
    </>
  );
}
