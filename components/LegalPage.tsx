import type { ReactNode } from "react";
import { seller } from "@/data/seller";

// Страница юридического документа: заголовок, дата редакции, текст и реквизиты продавца
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="simple-page legal-page">
      <div className="container narrow">
        <div className="descriptor">ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ</div>
        <h1>{title}</h1>
        <div className="legal-doc">
          <p className="legal-date">Редакция от {seller.updated}</p>
          {children}
          <h2>Реквизиты</h2>
          <p>
            {seller.name}, {seller.status}<br />
            ИНН {seller.inn}<br />
            Email: <a href={`mailto:${seller.email}`}>{seller.email}</a><br />
            Сайт: <a href={seller.siteUrl}>{seller.site}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
