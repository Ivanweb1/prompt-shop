export type ProductCategory = "Промпты" | "Инструкции" | "Скиллы" | "Гайды" | "Курсы" | "Шаблоны" | "Боты";

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
  pageUrl?: string; // своя страница вместо /product/<slug> (тарифы курса ведут на /course)
  access?: string; // вместо ссылки на файл в письме после оплаты — этот текст про доступ
  image?: string; // своя обложка из public/, вместо сгенерированного превью
  video?: string; // зацикленное видео-превью сайта (mp4 без звука), image — постер
  imageBg?: string; // цвет подложки под картинку
  volume: string[];
  facts?: { label: string; value: string }[]; // короткие факты в шапке товара
  steps?: { title: string; text: string }[]; // «Как это работает»
  stepsGoal?: string; // концовка заголовка «Три шага до …»
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

// Тарифы курса «Вау-сайты через Claude Code»: в каталоге карточками, «Подробнее» ведёт на /course
const courseAccess = "Доступ к урокам курса «Вау-сайты через Claude Code» пришлю лично в Telegram, который вы указали при заказе. Если сообщения долго нет — просто ответьте на это письмо";
export const courseTariffs: Product[] = [
  {
    slug: "course-record",
    title: "Курс «Вау-сайты через Claude Code» — запись курса",
    category: "Курсы",
    price: 9990,
    pageUrl: "/course/",
    image: "/course/demo-kaffa.jpg",
    video: "/course/demo-kaffa.mp4",
    imageBg: "#EFE6DA",
    access: courseAccess,
    volume: ["4 модуля", "Видеоуроки"],
    ai: ["Claude Code"],
    description: "Видеокурс: вау-сайты через Claude Code — от установки до сдачи клиенту",
    contents: ["4 модуля видеоуроков", "Фразы к каждому уроку", "Демо-проекты для разбора"],
    audience: ["Веб-дизайнерам", "Фрилансерам", "Новичкам без кода"],
    preview: { eyebrow: "Курс", result: "Вау-сайты через Claude Code" },
    popularity: 0,
    createdAt: "2026-11-11",
  },
  {
    slug: "course-feedback",
    title: "Курс «Вау-сайты через Claude Code» — с обратной связью",
    category: "Курсы",
    price: 29990,
    pageUrl: "/course/",
    image: "/course/demo-mirra.jpg",
    video: "/course/demo-mirra.mp4",
    imageBg: "#EFE6DA",
    access: courseAccess + ". Там же договоримся, как будем разбирать ваш проект",
    volume: ["4 модуля", "Обратная связь от Ивана"],
    ai: ["Claude Code"],
    description: "Видеокурс с обратной связью лично от Ивана по вашему проекту",
    contents: ["Всё из тарифа «Запись курса»", "Обратная связь лично от Ивана по вашему проекту", "Ответы на вопросы по ходу курса"],
    audience: ["Веб-дизайнерам", "Фрилансерам", "Новичкам без кода"],
    preview: { eyebrow: "Курс", result: "Вау-сайты через Claude Code" },
    popularity: 0,
    createdAt: "2026-11-11",
  },
];

const catalogItems: Product[] = [
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
    slug: "designer-docs",
    title: "Документы веб-дизайнера: договор, бриф, КП",
    category: "Шаблоны",
    price: 990,
    image: "/products/designer-docs.jpg",
    imageBg: "#D8E0F5",
    volume: ["5 документов Word", "Шаблон КП в Figma", "Скилл для Claude"],
    ai: ["Word", "Google Таблицы", "Figma", "Claude"],
    description: "Комплект, с которым проект на сайт проходит от первого созвона до сдачи без споров про правки и оплату: договор на три этапа с оплатой 50/50, бриф, акт, доп. соглашение и шаблон КП",
    contents: [
      "Договор на дизайн и вёрстку сайта — 3 этапа, оплата 50/50, права после полной оплаты",
      "Памятка: какой пункт договора от чего защищает",
      "Бриф на сайт — 49 вопросов в Word и таблице",
      "Акт сдачи-приёмки этапа",
      "Доп. соглашение о новых работах и сдвиге сроков",
      "Шаблон КП в Figma на 9 слайдов",
      "Скилл для Claude: из брифа — тексты КП и поля договора",
    ],
    audience: ["Веб-дизайнерам", "Фрилансерам", "Студиям"],
    facts: [
      { label: "Формат", value: "Word, таблица, Figma и SKILL.md" },
      { label: "Договор", value: "Для ИП и самозанятых, поля подсвечены" },
      { label: "Бриф", value: "49 вопросов в 4 блоках" },
      { label: "КП", value: "9 слайдов: задача, кейсы, этапы, тарифы" },
    ],
    steps: [
      { title: "Отправьте бриф", text: "До созвона — в Word или таблицей, как удобнее клиенту" },
      { title: "Соберите КП", text: "Загрузите заполненный бриф в Claude со скиллом — он подготовит тексты для слайдов КП и вопросы по пробелам" },
      { title: "Подпишите договор", text: "Заполните подсвеченные поля, закрывайте каждый этап актом, новые работы — через доп. соглашение" },
    ],
    stepsGoal: "подписанного договора",
    requirements: ["Word или Google Документы", "Аккаунт Figma для копии КП", "Claude — для скилла"],
    preview: { eyebrow: "На выходе", result: "Договор, бриф, акт и КП — готовы к отправке клиенту" },
    popularity: 9,
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

export const products: Product[] = [...catalogItems, ...courseTariffs];
// сервис оплаты импортирует allProducts — оставлено как синоним
export const allProducts = products;

export const productHref = (item: Product) => item.pageUrl ?? `/product/${item.slug}/`;

export const categories = (["Все", ...new Set(products.map((item) => item.category))] as const).map((name) => ({
  name,
  count: name === "Все" ? products.length : products.filter((item) => item.category === name).length,
}));

export const getProduct = (slug: string) => allProducts.find((item) => item.slug === slug);

export const formatPrice = (value: number) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";

export const priceLabel = (item: Product) =>
  item.isFree ? "Бесплатно" : `${item.priceFrom ? "от " : ""}${formatPrice(item.price)}${item.priceUnit ?? ""}`;
