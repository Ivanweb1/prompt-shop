import { Chevron } from "@/components/Chevron";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PreviewArt } from "@/components/PreviewArt";
import { ProductCover } from "@/components/ProductCover";
import { ProductCard } from "@/components/ProductCard";
import { asset } from "@/lib/asset";
import { formatPrice, getProduct, priceLabel, products } from "@/data/products";
import { AddToCartButton } from "@/components/AddToCartButton";

export function generateStaticParams() { return products.map((item) => ({ slug: item.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 2);
  const fallback = products.filter((item) => item.slug !== product.slug && !related.includes(item)).slice(0, 2 - related.length);
  const suggestions = [...related, ...fallback];
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return <>
    <section className="product-hero"><div className="container breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/#catalog">{product.category}</Link></div><div className="container product-layout">
      <div className="product-gallery"><ProductCover product={product} index={1} /><div className="gallery-note"><span>{product.example ? `Пример: ${product.example.title}` : "Превью результата"}</span>{!product.image && <span>Демо-изображение будет заменено</span>}</div></div>
      <div className="product-summary"><div className="card-meta"><span>{product.category}</span>{product.isFree && <span className="free-tag">Бесплатно</span>}</div><h1>{product.title}</h1><p>{product.description}</p><div className="compatibility">{product.ai.map((item) => <span key={item}>{item}</span>)}</div>{product.facts && <dl className="product-facts">{product.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}<div className="purchase-row"><div className="price-row"><strong>{priceLabel(product)}</strong>{product.oldPrice && <><s>{formatPrice(product.oldPrice)}</s><span className="discount">−{discount}%</span></>}</div>{product.externalUrl
        ? <a href={product.externalUrl} target="_blank" rel="noreferrer" className="button button-blue">Открыть бота <span aria-hidden><Chevron /></span></a>
        : <AddToCartButton item={{ type: "product", slug: product.slug }} />}</div>{product.externalUrl
        ? <div className="delivery-note"><b>Работает в Telegram</b><span>{product.priceNote}</span></div>
        : <div className="delivery-note"><b>Доставка на email</b><span>Ссылка или файл придут после оформления</span></div>}</div>
    </div></section>
    {product.steps && <section className="section product-steps"><div className="container"><div className="section-heading"><div><div className="descriptor">КАК ЭТО РАБОТАЕТ</div><h2>Три шага до <span className="highlight">готового сайта</span></h2></div></div><ol className="steps-grid">{product.steps.map((step, index) => <li key={step.title}><span>Шаг {index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>}
    <section className="section product-details"><div className="container details-grid"><div><div className="descriptor">ЧТО ВНУТРИ</div><h2>Всё для <span className="highlight">старта</span></h2></div><ol>{product.contents.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol><div className="detail-panel"><h3>Для кого</h3>{product.audience.map((item) => <p key={item}>{item}</p>)}{product.requirements
      ? <><h3>Понадобится</h3>{product.requirements.map((item) => <p key={item}>{item}</p>)}</>
      : <><h3>Совместимость</h3>{product.ai.map((item) => <p key={item}>{item}</p>)}</>}</div></div></section>
    {product.video && product.features
      ? <section className="section example-section"><div className="container example-grid example-grid-video"><div className="example-copy"><div className="descriptor">ЧТО БУДЕТ НА САЙТЕ</div><h2>Готовый сайт <span className="highlight">со сценарием</span></h2><ul className="feature-list">{product.features.map((item) => <li key={item}>{item}</li>)}</ul>{product.niches && <div className="niche-row"><b>Подходит для ниш</b><div className="compatibility">{product.niches.map((item) => <span key={item}>{item}</span>)}</div></div>}</div><figure className="example-video">
          <video src={asset(product.video)} poster={product.image ? asset(product.image) : undefined} autoPlay muted loop playsInline preload="metadata" />
          {product.example && <figcaption><b>{product.example.title}</b><span>{product.example.text}</span></figcaption>}
        </figure></div></section>
      : <section className="section example-section"><div className="container example-grid"><div className="example-copy"><div className="descriptor">ПРИМЕР ПРИМЕНЕНИЯ</div><h2>От вводных к готовому <span className="highlight">результату</span></h2><p>Добавьте контекст своего проекта, пройдите шаги материала и адаптируйте результат под задачу</p></div><PreviewArt eyebrow="Пример" result={product.preview.result} dark index={2} /></div></section>}
    <section className="section related"><div className="container"><div className="section-heading"><div><div className="descriptor">ЕЩЁ ПО ТЕМЕ</div><h2>Похожие <span className="highlight">материалы</span></h2></div></div><div className="product-grid related-grid">{suggestions.map((item, index) => <ProductCard product={item} index={index + 1} key={item.slug} />)}</div></div></section>
  </>;
}
