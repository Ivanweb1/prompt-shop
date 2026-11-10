"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { CartIcon } from "./CartIcon";

export function CartButton() {
  const count = useCart().length;
  return (
    <Link href="/cart/" className="cart-button" aria-label={count ? `Корзина, товаров: ${count}` : "Корзина"}>
      <CartIcon />
      {count > 0 && <b className="cart-count">{count}</b>}
    </Link>
  );
}
