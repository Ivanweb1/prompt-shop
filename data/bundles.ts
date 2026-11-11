// Без импортов: файл читает и сервер оплаты (server/), а Node не понимает пути без расширения
export type Bundle = {
  slug: string;
  title: string;
  description: string;
  productSlugs: string[];
  price: number;
  oldPrice: number;
};

export const bundles: Bundle[] = [];
export const getBundle = (slug: string) => bundles.find((item) => item.slug === slug);
