import Link from "next/link";
import { Product, formatPrice, priceLabel, productHref } from "@/data/products";
import { CartAddIcon } from "./CartAddIcon";
import { ProductCover } from "./ProductCover";

export function ProductCard({ product, index = 1 }: { product: Product; index?: number }) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <article className="product-card">
      <Link href={productHref(product)} className="card-preview" aria-label={product.title}>
        <ProductCover product={product} index={index} dark={index % 3 === 0} />
      </Link>
      <div className="card-body">
        <div className="card-meta"><span>{product.category}</span>{product.isFree && <span className="free-tag">Бесплатно</span>}</div>
        <h3><Link href={productHref(product)}>{product.title}</Link></h3>
        <div className="card-volume">{product.volume.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="price-row">
          <strong>{priceLabel(product)}</strong>
          {product.oldPrice && <><s>{formatPrice(product.oldPrice)}</s><span className="discount">−{discount}%</span></>}
          <div className="card-actions">
            <Link href={productHref(product)} className="card-more">Подробнее</Link>
            {!product.externalUrl && <CartAddIcon item={{ type: "product", slug: product.slug }} title={product.title} />}
          </div>
        </div>
      </div>
    </article>
  );
}
