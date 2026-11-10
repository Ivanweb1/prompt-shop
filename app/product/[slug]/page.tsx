import { Chevron } from "@/components/Chevron";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PreviewArt } from "@/components/PreviewArt";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, priceLabel, products } from "@/data/products";
import { AddToCartButton } from "@/components/AddToCartButton";

export function generateStaticParams() { return products.map((item) => ({ slug: item.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 2);
  const fallback = products.filter((item) => item.slug !== product.slug).slice(0, 2 - related.length);
  const suggestions = [...related, ...fallback];
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return <>
    <section className="product-hero"><div className="container breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/#catalog">{product.category}</Link></div><div className="container product-layout">
      <div className="product-gallery"><PreviewArt {...product.preview} index={1} /><div className="gallery-note"><span>Превью результата</span><span>Демо-изображение будет заменено</span></div></div>
      <div className="product-summary"><div className="card-meta"><span>{product.category}</span>{product.isFree && <span className="free-tag">Бесплатно</span>}</div><h1>{product.title}</h1><p>{product.description}</p><div className="compatibility">{product.ai.map((item) => <span key={item}>{item}</span>)}</div><div className="purchase-row"><div className="price-row"><strong>{priceLabel(product)}</strong>{product.oldPrice && <><s>{formatPrice(product.oldPrice)}</s><span className="discount">−{discount}%</span></>}</div>{product.externalUrl
        ? <a href={product.externalUrl} target="_blank" rel="noreferrer" className="button button-blue">Открыть бота <span aria-hidden><Chevron /></span></a>
        : <AddToCartButton item={{ type: "product", slug: product.slug }} />}</div>{product.externalUrl
        ? <div className="delivery-note"><b>Работает в Telegram</b><span>{product.priceNote}</span></div>
        : <div className="delivery-note"><b>Доставка на email</b><span>Ссылка или файл придут после оформления</span></div>}</div>
    </div></section>
    <section className="section product-details"><div className="container details-grid"><div><div className="descriptor">ЧТО ВНУТРИ</div><h2>Всё для <span className="highlight">старта</span></h2></div><ol>{product.contents.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol><div className="detail-panel"><h3>Для кого</h3>{product.audience.map((item) => <p key={item}>{item}</p>)}<h3>Совместимость</h3>{product.ai.map((item) => <p key={item}>{item}</p>)}</div></div></section>
    <section className="section example-section"><div className="container example-grid"><div className="example-copy"><div className="descriptor">ПРИМЕР ПРИМЕНЕНИЯ</div><h2>От вводных к готовому <span className="highlight">результату</span></h2><p>Добавьте контекст своего проекта, пройдите шаги материала и адаптируйте результат под задачу</p></div><PreviewArt eyebrow="Пример" result={product.preview.result} dark index={2} /></div></section>
    <section className="section related"><div className="container"><div className="section-heading"><div><div className="descriptor">ЕЩЁ ПО ТЕМЕ</div><h2>Похожие <span className="highlight">материалы</span></h2></div></div><div className="product-grid related-grid">{suggestions.map((item, index) => <ProductCard product={item} index={index + 1} key={item.slug} />)}</div></div></section>
  </>;
}
