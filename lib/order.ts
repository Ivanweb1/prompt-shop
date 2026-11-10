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

// Точка расширения второго этапа: здесь появится запрос к API-роуту ЮKassa
export async function submitOrder(draft: OrderDraft) {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return { ok: true, orderId: `demo-${draft.items.map((item) => item.slug).join("+")}` };
}
