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
  video?: string; // зацикленное видео-превью сайта (mp4 без звука), image — постер
  imageBg?: string; // цвет подложки под картинку
  volume: string[];
  facts?: { label: string; value: string }[]; // короткие факты в шапке товара
  steps?: { title: string; text: string }[]; // «Как это работает»
  features?: string[]; // что будет в готовом результате
  niches?: string[]; // для каких ниш подходит
  requirements?: string[]; // что понадобится покупателю
  example?: { title: string; text: string }; // подпись к видео-примеру
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
    slug: "scroll-video-site",
    title: "Живой сайт со скролл-видео — под любую нишу",
    category: "Промпты",
    price: 490,
    image: "/products/scroll-video-site-poster.jpg",
    video: "/products/scroll-video-site.mp4",
    imageBg: "#DEE4F4",
    volume: ["Промпт + скилл", "Под любую нишу"],
    ai: ["Claude", "Генератор видео"],
    description: "Сайт, где картинка оживает при прокрутке: предмет появляется на первом экране, раскрывается при скролле и приходит к покупке. Подставляете нишу, бренд и тексты клиента — Claude собирает сайт",
    contents: ["Промпты для 4 ключевых кадров под вашу нишу", "Промпты для 3 видео между кадрами", "Промпт сайта для Claude с переменными", "Скилл для Claude и инструкция в 3 шага"],
    audience: ["Веб-дизайнерам", "Фрилансерам", "Студиям"],
    facts: [
      { label: "Формат", value: "PROMPT.md, SKILL.md и README.md" },
      { label: "Ниша", value: "Любая, где есть один главный предмет" },
      { label: "Понадобится", value: "Claude и генератор видео по двум кадрам" },
      { label: "Сайт", value: "Статика: HTML, CSS, JS без сборщика" },
    ],
    steps: [
      { title: "Заполните переменные", text: "Ниша, бренд, главный предмет, цвет фона и тексты — в начале PROMPT.md" },
      { title: "Сгенерируйте кадры и видео", text: "4 ключевых кадра и 3 видео между ними — в любом генераторе с режимом «первый и последний кадр»" },
      { title: "Соберите сайт в Claude", text: "Вставьте промпт шага 3 вместе с кадрами и видео — Claude соберёт сайт, дальше дорабатываете по блоку" },
    ],
    features: [
      "Вход: первое видео проигрывается само, интерфейс появляется каскадом",
      "Раскрытие: скролл прокручивает видео, вокруг предмета появляются подписи",
      "Покупка: предмет садится в финал, под ним варианты, цена и кнопка",
      "Кадры на canvas по положению скролла — без рывков и белых кадров",
      "На ширине меньше 900 px карточки идут в столбик",
      "Режим ?demo=1 — сайт сам проигрывает сценарий для записи экрана",
    ],
    niches: ["Парфюм", "Кофе", "Косметика", "Украшения", "Техника", "Мебель"],
    requirements: ["Claude", "Генератор изображений 16:9", "Генератор видео «первый и последний кадр»"],
    example: { title: "MIRRA — нишевый парфюм", text: "Сайт на этом приёме: капля превращается во флакон, при скролле вокруг разлетаются ноты аромата, в финале — блок покупки" },
    preview: { eyebrow: "На выходе", result: "Промо-сайт, где видео идёт за скроллом, под нишу клиента" },
    popularity: 10,
    createdAt: "2026-11-11",
  },
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
