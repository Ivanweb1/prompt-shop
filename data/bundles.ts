import { products } from "./products";

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
export const getBundleProducts = (bundle: Bundle) => products.filter((item) => bundle.productSlugs.includes(item.slug));
