"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

// После возврата со страницы оплаты корзина больше не нужна
export function ClearCart() {
  useEffect(() => clearCart(), []);
  return null;
}
