"use client";

import { useSyncExternalStore } from "react";
import { getBundle } from "@/data/bundles";
import { getProduct } from "@/data/products";

// Корзина хранится в браузере покупателя (localStorage) — до подключения оплаты этого достаточно
export type CartItem = { type: "product" | "bundle"; slug: string };

const KEY = "creative-ai-cart";
const EVENT = "cart-change";
const EMPTY: CartItem[] = [];
let cache: { raw: string | null; items: CartItem[] } = { raw: null, items: EMPTY };

function read(): CartItem[] {
  let raw: string | null = null;
  try { raw = localStorage.getItem(KEY); } catch { return EMPTY; }
  if (raw === cache.raw) return cache.items;
  let items: CartItem[] = EMPTY;
  try { items = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY; } catch { items = EMPTY; }
  cache = { raw, items };
  return items;
}

function write(items: CartItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* приватный режим — корзина живёт до перезагрузки */ }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener("storage", callback); };
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const inCart = (items: CartItem[], item: CartItem) => items.some((x) => x.type === item.type && x.slug === item.slug);
export const addToCart = (item: CartItem) => { const items = read(); if (!inCart(items, item)) write([...items, item]); };
export const removeFromCart = (item: CartItem) => write(read().filter((x) => !(x.type === item.type && x.slug === item.slug)));
export const clearCart = () => write([]);

// Название, раздел и цена позиции корзины
export function describe(item: CartItem) {
  if (item.type === "bundle") {
    const b = getBundle(item.slug);
    return b && { title: b.title, label: "Комплект", price: b.price, href: `/bundle/${b.slug}/` };
  }
  const p = getProduct(item.slug);
  return p && { title: p.title, label: p.category, price: p.isFree ? 0 : p.price, href: `/product/${p.slug}/` };
}
