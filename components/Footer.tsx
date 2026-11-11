import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { seller } from "@/data/seller";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-panel">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-mark"><Image className="brand-avatar" src={asset("/brand/avatar.jpg")} alt="" width={36} height={36} /><span>Ivan · Creative Director</span></div>
            <p>Цифровые материалы для дизайнеров, которые работают с AI</p>
          </div>
          <div>
            <div className="descriptor">НАВИГАЦИЯ</div>
            <Link href="/#catalog">Каталог</Link>
            <Link href="/#about">Об авторе</Link>
          </div>
          <div>
            <div className="descriptor">ИНФОРМАЦИЯ</div>
            <Link href="/offer/">Оферта</Link>
            <Link href="/privacy/">Политика обработки данных</Link>
            <Link href="/consent/">Согласие на обработку данных</Link>
            <a href={`mailto:${seller.email}`}>{seller.email}</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Иван Панькин</span><span>{seller.name} · ИНН {seller.inn}</span></div>
      </div>
    </footer>
  );
}
