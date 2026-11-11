import type { CartItem } from "./cart";

export type OrderDraft = {
  email: string;
  telegram: string;
  adsConsent: boolean; // согласие на рекламную рассылку — отдельное и необязательное
  items: CartItem[];
};

export function createCheckoutUrl(itemType: CartItem["type"], itemSlug: string) {
  const params = new URLSearchParams({ type: itemType, item: itemSlug });
  return `/checkout?${params.toString()}`;
}

// Заказ уходит на сервис оплаты (server/), он отвечает адресом страницы оплаты ЮKassa.
// Сервис работает только на creative-ai.shop: на копии в GitHub Pages оплаты нет.
export async function submitOrder(draft: OrderDraft): Promise<{ ok: true; redirect: string } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.redirect) return { ok: true, redirect: data.redirect };
    return { ok: false, error: data.error || "Оплата сейчас недоступна, попробуйте позже" };
  } catch {
    return { ok: false, error: "Нет связи с сервером, проверьте интернет и попробуйте ещё раз" };
  }
}
