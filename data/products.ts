export type ProductCategory = "Промпты" | "Инструкции" | "Скиллы" | "Гайды" | "Курсы";

export type Product = {
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  isFree?: boolean;
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
    slug: "site-concept-prompt-demo",
    title: "[ДЕМО] Промпт для концепции сайта",
    category: "Промпты",
    price: 590,
    oldPrice: 790,
    volume: ["12 стр.", "7 переменных"],
    ai: ["Claude", "ChatGPT"],
    description: "Структурированная инструкция, которая помогает собрать направление, логику страниц и основу визуальной концепции",
    contents: ["Бриф для исходных данных", "Пошаговый мастер-промпт", "Проверка результата", "Пример заполнения"],
    audience: ["Веб-дизайнерам", "Арт-директорам", "Небольшим студиям"],
    preview: { eyebrow: "Результат", result: "Концепция сайта с ясной логикой и визуальным направлением" },
    popularity: 8,
    createdAt: "2026-10-22",
  },
  {
    slug: "ai-research-agent-demo",
    title: "[ДЕМО] Агент для исследования ниши",
    category: "Инструкции",
    price: 890,
    volume: ["18 стр.", "4 сценария"],
    ai: ["Codex", "Claude"],
    description: "Инструкция для AI-агента, который собирает источники, сравнивает решения и готовит рабочую выжимку",
    contents: ["Роль агента", "Сценарий исследования", "Формат отчёта", "Чек-лист проверки"],
    audience: ["Дизайнерам", "Предпринимателям", "Продакт-командам"],
    preview: { eyebrow: "На выходе", result: "Исследование рынка, готовое к обсуждению с командой" },
    popularity: 10,
    createdAt: "2026-10-29",
  },
  {
    slug: "figma-audit-skill-demo",
    title: "[ДЕМО] Скилл аудита макета в Figma",
    category: "Скиллы",
    price: 690,
    oldPrice: 990,
    volume: ["1 skill", "24 проверки"],
    ai: ["Codex", "Claude"],
    description: "Готовый скилл для последовательной проверки структуры, типографики, состояний и адаптивов макета",
    contents: ["SKILL.md", "Система приоритетов", "Шаблон отчёта", "Инструкция по установке"],
    audience: ["Продуктовым дизайнерам", "Фрилансерам", "Дизайн-лидам"],
    preview: { eyebrow: "Что получится", result: "Понятный отчёт по макету с приоритетами правок" },
    popularity: 9,
    createdAt: "2026-10-17",
  },
  {
    slug: "case-structure-guide-demo",
    title: "[ДЕМО] Гайд по структуре дизайн-кейса",
    category: "Гайды",
    price: 390,
    volume: ["26 стр.", "3 шаблона"],
    ai: ["Claude", "ChatGPT", "Gemini"],
    description: "Практическая схема, чтобы превратить материалы проекта в последовательный и убедительный рассказ",
    contents: ["Структура кейса", "Вопросы к проекту", "Шаблоны блоков", "Финальная проверка"],
    audience: ["Начинающим дизайнерам", "Фрилансерам", "Студентам"],
    preview: { eyebrow: "Результат", result: "Каркас кейса, который легко наполнить своим материалом" },
    popularity: 7,
    createdAt: "2026-09-21",
  },
  {
    slug: "ai-layout-checklist-demo",
    title: "[ДЕМО] Чек-лист вёрстки с AI",
    category: "Гайды",
    price: 0,
    isFree: true,
    volume: ["9 стр.", "32 пункта"],
    ai: ["Codex", "Claude"],
    description: "Короткая памятка для проверки страницы после сборки: от сетки и состояний до мобильной версии",
    contents: ["Проверка структуры", "Проверка интерфейса", "Адаптив", "Финальный прогон"],
    audience: ["Веб-дизайнерам", "Разработчикам", "Тем, кто собирает первый сайт"],
    preview: { eyebrow: "Бесплатный материал", result: "Финальная проверка сайта перед публикацией" },
    popularity: 11,
    createdAt: "2026-10-31",
  },
  {
    slug: "tilda-copy-prompt-demo",
    title: "[ДЕМО] Промпт для текста лендинга",
    category: "Промпты",
    price: 490,
    volume: ["10 стр.", "9 переменных"],
    ai: ["Claude", "ChatGPT", "Gemini"],
    description: "Сценарий работы с текстом: от вводных и структуры до финальных формулировок для каждого блока",
    contents: ["Сбор контекста", "Структура страницы", "Мастер-промпт", "Редакторская проверка"],
    audience: ["Дизайнерам на Tilda", "Фрилансерам", "Малым командам"],
    preview: { eyebrow: "Что получится", result: "Черновик лендинга, собранный вокруг задачи продукта" },
    popularity: 6,
    createdAt: "2026-10-04",
  },
  {
    slug: "design-system-agent-demo",
    title: "[ДЕМО] Агент для дизайн-системы",
    category: "Инструкции",
    price: 1190,
    oldPrice: 1490,
    volume: ["21 стр.", "6 этапов"],
    ai: ["Codex", "Claude"],
    description: "Рабочий процесс для разбора интерфейса на токены, компоненты, состояния и правила применения",
    contents: ["Аудит интерфейса", "Токены", "Компоненты", "Документация"],
    audience: ["Дизайн-лидам", "Продуктовым командам", "Разработчикам"],
    preview: { eyebrow: "На выходе", result: "Основа дизайн-системы с едиными правилами" },
    popularity: 5,
    createdAt: "2026-09-28",
  },
  {
    slug: "ai-web-course-demo",
    title: "[ДЕМО] Мини-курс по сборке сайта с AI",
    category: "Курсы",
    price: 2490,
    volume: ["6 уроков", "2 проекта"],
    ai: ["Figma", "Codex", "Claude"],
    description: "Последовательный маршрут от постановки задачи и дизайна до адаптивной сборки и проверки",
    contents: ["6 видеоуроков", "Рабочие файлы", "Промпты к урокам", "Чек-листы"],
    audience: ["Веб-дизайнерам", "Новичкам в AI-инструментах", "Фрилансерам"],
    preview: { eyebrow: "Финал курса", result: "Собранная страница и понятный повторяемый процесс" },
    popularity: 4,
    createdAt: "2026-10-12",
  },
];

export const categories = (["Все", ...new Set(products.map((item) => item.category))] as const).map((name) => ({
  name,
  count: name === "Все" ? products.length : products.filter((item) => item.category === name).length,
}));

export const getProduct = (slug: string) => products.find((item) => item.slug === slug);

export const formatPrice = (value: number) => new Intl.NumberFormat("ru-RU").format(value) + " ₽";
