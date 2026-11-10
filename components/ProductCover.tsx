import type { Product } from "@/data/products";
import { asset } from "@/lib/asset";
import { PreviewArt } from "./PreviewArt";

// Обложка товара: своя картинка, если есть, иначе сгенерированное превью
export function ProductCover({ product, index = 1, dark = false }: { product: Product; index?: number; dark?: boolean }) {
  if (product.image) {
    return (
      <div className="preview-art preview-image" style={product.imageBg ? { background: product.imageBg } : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(product.image)} alt="" loading="lazy" />
      </div>
    );
  }
  return <PreviewArt {...product.preview} index={index} dark={dark} />;
}
