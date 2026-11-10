"use client";

import Link from "next/link";
import { Chevron } from "@/components/Chevron";
import { CheckoutForm } from "@/components/CheckoutForm";
import { formatPrice } from "@/data/products";
import { clearCart, describe, removeFromCart, useCart } from "@/lib/cart";

export function CartPageContent() {
  const items = useCart();
  const rows = items.flatMap((item) => { const info = describe(item); return info ? [{ item, ...info }] : []; });
  const total = rows.reduce((sum, row) => sum + row.price, 0);

  if (rows.length === 0) {
    return <section className="simple-page"><div className="container narrow"><div className="descriptor">КОРЗИНА</div><h1>Корзина <span className="highlight">пуста</span></h1><p>Добавьте материалы из каталога — они появятся здесь</p><Link className="button button-blue" href="/#catalog">Перейти в каталог <span aria-hidden><Chevron /></span></Link></div></section>;
  }

  return (
    <section className="checkout-page"><div className="container checkout-grid">
      <div className="checkout-copy">
        <div className="descriptor">КОРЗИНА</div>
        <h1>Ваш <span className="highlight">заказ</span></h1>
        <p>Материалы придут на email после оплаты</p>
        <ul className="cart-list">
          {rows.map((row) => (
            <li key={`${row.item.type}-${row.item.slug}`}>
              <Link href={row.href}><small>{row.label}</small><b>{row.title}</b></Link>
              <strong>{row.price === 0 ? "Бесплатно" : formatPrice(row.price)}</strong>
              <button type="button" onClick={() => removeFromCart(row.item)} aria-label={`Удалить ${row.title}`}>×</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="checkout-panel">
        <div className="order-summary"><span>Итого · {rows.length} {rows.length === 1 ? "позиция" : rows.length < 5 ? "позиции" : "позиций"}</span><strong className="order-total">{total === 0 ? "Бесплатно" : formatPrice(total)}</strong></div>
        <CheckoutForm items={items} onSuccess={clearCart} />
      </div>
    </div></section>
  );
}
