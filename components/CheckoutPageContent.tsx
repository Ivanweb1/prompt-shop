"use client";

import { Chevron } from "@/components/Chevron";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getBundle } from "@/data/bundles";
import { formatPrice, getProduct } from "@/data/products";

export function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") === "bundle" ? "bundle" : "product";
  const item = searchParams.get("item");
  const product = type === "product" && item ? getProduct(item) : undefined;
  const bundle = type === "bundle" && item ? getBundle(item) : undefined;
  const selected = product ?? bundle;

  if (!selected) return <section className="simple-page"><div className="container narrow"><div className="descriptor">ОФОРМЛЕНИЕ</div><h1>Выберите материал</h1><p>Вернитесь в каталог и откройте товар или комплект</p><Link className="button button-blue" href="/#catalog">Перейти в каталог <span><Chevron /></span></Link></div></section>;

  const price = product ? product.price : bundle!.price;
  const isCourse = Boolean(product?.access);
  return <section className="checkout-page"><div className="container checkout-grid"><div className="checkout-copy"><div className="descriptor">ОФОРМЛЕНИЕ ЗАКАЗА</div><h1>Почти <span className="highlight">готово</span></h1><p>{isCourse ? "Укажите email и Telegram — после оплаты пришлю доступ к курсу" : "Укажите email, на который придёт материал после оплаты"}</p><div className="checkout-steps"><span className="active"><b>01</b>Контакты</span><span><b>02</b>Оплата</span><span><b>03</b>{isCourse ? "Доступ" : "Материал"}</span></div></div><div className="checkout-panel"><div className="order-summary"><span>{type === "bundle" ? "Комплект" : product!.category}</span><h2>{selected.title}</h2><strong>{price === 0 ? "Бесплатно" : formatPrice(price)}</strong></div><CheckoutForm items={[{ type, slug: selected.slug }]} isCourse={isCourse} /></div></div></section>;
}
