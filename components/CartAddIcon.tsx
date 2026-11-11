"use client";

import Link from "next/link";
import { CartItem, addToCart, inCart, useCart } from "@/lib/cart";
import { CartIcon } from "./CartIcon";

// Круглая синяя кнопка «в корзину» для карточки товара
export function CartAddIcon({ item, title }: { item: CartItem; title: string }) {
  const items = useCart();
  if (inCart(items, item)) {
    return <Link href="/cart/" className="card-cart is-added" aria-label="Товар в корзине — перейти" title="В корзине"><CartIcon /></Link>;
  }
  return <button type="button" className="card-cart" onClick={() => addToCart(item)} aria-label={`Добавить в корзину: ${title}`} title="Добавить в корзину"><CartIcon /></button>;
}
