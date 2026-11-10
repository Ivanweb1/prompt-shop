import { Chevron } from "@/components/Chevron";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewArt } from "@/components/PreviewArt";
import { bundles, getBundle, getBundleProducts } from "@/data/bundles";
import { formatPrice } from "@/data/products";
import { AddToCartButton } from "@/components/AddToCartButton";

export function generateStaticParams() { return bundles.map((item) => ({ slug: item.slug })); }

export default async function BundlePage({ params }: { params: Promise<{ slug: string }> }) {
  const bundle = getBundle((await params).slug);
  if (!bundle) notFound();
  const items = getBundleProducts(bundle);
  const discount = Math.round((1 - bundle.price / bundle.oldPrice) * 100);
  return <>
    <section className="bundle-page-hero"><div className="container breadcrumb dark-breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/#bundles">Комплекты</Link></div><div className="container product-layout">
      <div className="product-gallery"><PreviewArt eyebrow="Комплект" result="Идея → сборка → проверка" dark /><div className="gallery-note inverse-note"><span>3 материала</span><span>Единый рабочий маршрут</span></div></div>
      <div className="product-summary bundle-summary"><div className="bundle-label">Комплект · −{discount}%</div><h1>{bundle.title}</h1><p>{bundle.description}</p><div className="purchase-row"><div className="price-row bundle-price"><strong>{formatPrice(bundle.price)}</strong><s>{formatPrice(bundle.oldPrice)}</s></div><AddToCartButton item={{ type: "bundle", slug: bundle.slug }} /></div><div className="delivery-note dark-note"><b>Одна покупка</b><span>Все материалы комплекта придут на email</span></div></div>
    </div></section>
    <section className="section bundle-contents"><div className="container"><div className="section-heading"><div><div className="descriptor">СОСТАВ КОМПЛЕКТА</div><h2>Три связанных <span className="highlight">шага</span></h2></div></div><div className="bundle-list">{items.map((item, index) => <Link href={`/product/${item.slug}`} key={item.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p></div><b><Chevron /></b></Link>)}</div></div></section>
  </>;
}
