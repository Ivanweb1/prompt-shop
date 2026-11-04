import { products } from "./products";

export type Bundle = {
  slug: string;
  title: string;
  description: string;
  productSlugs: string[];
  price: number;
  oldPrice: number;
};

export const bundles: Bundle[] = [
  {
    slug: "designer-ai-start-demo",
    title: "[ДЕМО] AI-старт для веб-дизайнера",
    description: "Три материала для пути от идеи сайта до готового кейса и аккуратной финальной проверки",
    productSlugs: ["site-concept-prompt-demo", "case-structure-guide-demo", "ai-layout-checklist-demo"],
    price: 790,
    oldPrice: 980,
  },
];

export const getBundle = (slug: string) => bundles.find((item) => item.slug === slug);
export const getBundleProducts = (bundle: Bundle) => products.filter((item) => bundle.productSlugs.includes(item.slug));
