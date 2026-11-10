"use client";

import { useMemo, useState } from "react";
import { Product, ProductCategory, categories } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SortDropdown, type SortMode } from "./SortDropdown";

type CategoryFilter = ProductCategory | "Все";

export function Catalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<CategoryFilter>("Все");
  const [sort, setSort] = useState<SortMode>("new");
  const visible = useMemo(() => {
    const list = category === "Все" ? [...products] : products.filter((item) => item.category === category);
    return list.sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      if (sort === "popular") return b.popularity - a.popularity;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [category, products, sort]);

  return (
    <section className="section catalog-section" id="catalog">
      <div className="container">
        <div className="section-heading"><div><div className="descriptor">КАТАЛОГ</div><h2>Материалы для <span className="highlight">работы</span></h2></div><p>Выберите задачу и заберите готовый рабочий процесс</p></div>
        <div className="catalog-controls">
          <div className="filter-pills" role="group" aria-label="Фильтр по категориям">
            {categories.map((item) => <button key={item.name} onClick={() => setCategory(item.name as CategoryFilter)} className={category === item.name ? "active" : ""}>{item.name}<sup>{item.count}</sup></button>)}
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div className="product-grid">{visible.map((product, index) => <ProductCard product={product} index={index + 1} key={product.slug} />)}</div>
      </div>
    </section>
  );
}
