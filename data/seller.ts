// Реквизиты продавца — подставляются во все юридические документы и подвал.
// Поля с «‹…›» нужно заполнить до запуска продаж.
export const seller = {
  name: "Панькин Иван Олегович",
  status: "плательщик налога на профессиональный доход (самозанятый)",
  inn: "421309725992",
  email: "creativeai.shop@mail.ru",
  telegram: "@ivan_web_1",
  site: "creative-ai.shop",
  siteUrl: "https://creative-ai.shop",
  updated: "11 ноября 2026 г.",
};

export const sellerReady = !Object.values(seller).some((value) => value.includes("‹"));
