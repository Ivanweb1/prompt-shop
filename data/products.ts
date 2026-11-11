export type ProductCategory = "Промпты" | "Инструкции" | "Скиллы" | "Гайды" | "Курсы" | "Боты";

export type Product = {
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  isFree?: boolean;
  priceFrom?: boolean; // «от 100 ₽»
  priceUnit?: string; // «/мес»
  priceNote?: string; // расшифровка тарифов на странице товара
  externalUrl?: string; // товар покупается не через сайт (например, Telegram-бот)
  image?: string; // своя обложка из public/, вместо сгенерированного превью
  imageBg?: string; // цвет подложки под картинку
  volume: string[];
  ai: string[];
  description: string;
  contents: string[];
  audience: string[];
  preview: { eyebrow: string; result: string };
  popularity: number;
  createdAt: string;
};

export const products: Product[] = [
  {
    slug: "audit-lead-bot",
    title: "Парсер 2ГИС — @AuditLead_Bot",
    category: "Боты",
    price: 100,
    priceFrom: true,
    priceNote: "Пакеты: 50 контактов — 100 ₽, 170 — 300 ₽, 300 — 500 ₽. 1 кредит = 1 контакт компании",
    externalUrl: "https://t.me/AuditLead_Bot",
    image: "/products/auditlead.jpg",
    imageBg: "#000000",
    volume: ["Telegram-бот", "5 контактов бесплатно"],
    ai: ["Telegram", "2ГИС", "CSV"],
    description: "Находит компании без сайта, у которых в контактах есть Telegram. Указываете нишу и город, например «стоматология Казань», — получаете готовую базу для рассылки",
    contents: ["Поиск по нише и городу", "Телефон, Telegram, email, WhatsApp", "Адрес, описание и рейтинг компании", "Выгрузка базы в CSV"],
    audience: ["Дизайнерам в поиске клиентов", "Фрилансерам", "Агентствам"],
    preview: { eyebrow: "На выходе", result: "База компаний без сайта с контактами для рассылки" },
    popularity: 12,
    createdAt: "2026-11-10",
  },
  {
    slug: "reach-tg-bot",
    title: "Рассылки в Telegram — @ReachTGbot",
    category: "Боты",
    price: 1990,
    priceFrom: true,
    priceUnit: "/мес",
    priceNote: "Пробный тариф бесплатно. Старт — 1 990 ₽, Про — 4 900 ₽, Агентство — 12 900 ₽ в месяц",
    externalUrl: "https://t.me/ReachTGbot",
    image: "/products/reachtg.jpg",
    imageBg: "#01071A",
    volume: ["Mini App", "Пробный тариф"],
    ai: ["Telegram", "CSV"],
    description: "Рассылает сообщения по базе с нескольких Telegram-аккаунтов, бережёт их от бана и собирает ответы лидов в одном окне",
    contents: ["Несколько аккаунтов и кампаний", "Паузы и лимиты против бана", "Ответы лидов прямо в приложении", "Статистика по кампаниям, ИИ-ответы на тарифе «Про»"],
    audience: ["Дизайнерам в поиске клиентов", "Фрилансерам", "Агентствам"],
    preview: { eyebrow: "Результат", result: "Рассылка по базе и диалоги с лидами в одном окне" },
    popularity: 12,
    createdAt: "2026-11-10",
  },
];

export const categories = (["Все", ...new Set(products.map((item) => item.category))] as const).map((name) => ({
  name,
  count: name === "Все" ? products.length : products.filter((item) => item.category === name).length,
}));

export const getProduct = (slug: string) => products.find((item) => item.slug === slug);

export const formatPrice = (value: number) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";

export const priceLabel = (item: Product) =>
  item.isFree ? "Бесплатно" : `${item.priceFrom ? "от " : ""}${formatPrice(item.price)}${item.priceUnit ?? ""}`;
