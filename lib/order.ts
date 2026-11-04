export type OrderDraft = {
  email: string;
  itemType: "product" | "bundle";
  itemSlug: string;
};

export function createCheckoutUrl(itemType: OrderDraft["itemType"], itemSlug: string) {
  const params = new URLSearchParams({ type: itemType, item: itemSlug });
  return `/checkout?${params.toString()}`;
}

// Точка расширения второго этапа: здесь появится запрос к API-роуту ЮKassa
export async function submitOrder(draft: OrderDraft) {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return { ok: true, orderId: `demo-${draft.itemSlug}` };
}
