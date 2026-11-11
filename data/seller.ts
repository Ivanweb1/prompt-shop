// Реквизиты продавца — подставляются во все юридические документы и подвал.
// Поля с «‹…›» нужно заполнить до запуска продаж.
export const seller = {
  name: "Панькин Иван ‹Отчество›",
  status: "плательщик налога на профессиональный доход (самозанятый)",
  inn: "‹ИНН›",
  email: "creativeai.shop@mail.ru",
  telegram: "‹@username›",
  site: "creative-ai.shop",
  siteUrl: "https://creative-ai.shop",
  updated: "11 ноября 2026 г.",
};

export const sellerReady = !Object.values(seller).some((value) => value.includes("‹"));
