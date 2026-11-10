"use client";

import Link from "next/link";
import { CartItem, addToCart, inCart, useCart } from "@/lib/cart";
import { Chevron } from "./Chevron";

export function AddToCartButton({ item }: { item: CartItem }) {
  const items = useCart();
  if (inCart(items, item)) {
    return <Link href="/cart/" className="button button-dark">В корзине · перейти <span aria-hidden><Chevron /></span></Link>;
  }
  return <button type="button" className="button button-blue" onClick={() => addToCart(item)}>Добавить в корзину <span aria-hidden><Chevron /></span></button>;
}
