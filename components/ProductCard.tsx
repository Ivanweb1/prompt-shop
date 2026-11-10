import { Chevron } from "@/components/Chevron";
import Link from "next/link";
import { Product, formatPrice } from "@/data/products";
import { PreviewArt } from "./PreviewArt";

export function ProductCard({ product, index = 1 }: { product: Product; index?: number }) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <article className="product-card">
      <Link href={`/product/${product.slug}`} className="card-preview" aria-label={product.title}>
        <PreviewArt {...product.preview} index={index} dark={index % 3 === 0} />
      </Link>
      <div className="card-body">
        <div className="card-meta"><span>{product.category}</span>{product.isFree && <span className="free-tag">Бесплатно</span>}</div>
        <h3><Link href={`/product/${product.slug}`}>{product.title}</Link></h3>
        <div className="card-volume">{product.volume.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="price-row">
          <strong>{product.isFree ? "Бесплатно" : formatPrice(product.price)}</strong>
          {product.oldPrice && <><s>{formatPrice(product.oldPrice)}</s><span className="discount">−{discount}%</span></>}
        </div>
      </div>
      <Link href={`/product/${product.slug}`} className="card-link" aria-label={`Открыть ${product.title}`}><Chevron /></Link>
    </article>
  );
}
