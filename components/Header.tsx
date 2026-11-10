import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import { CartButton } from "@/components/CartButton";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="brand-mark" aria-label="На главную">
            <Image className="brand-avatar" src={asset("/brand/avatar.jpg")} alt="" width={36} height={36} priority />
            <span>Ivan<span className="brand-role"> · Creative Director</span></span>
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <Link href="/#catalog">Каталог</Link>
            <Link href="/#bundles">Комплекты</Link>
            <Link href="/#about">Об авторе</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <div className="header-actions">
            <CartButton />
            <Link href="/#catalog" className="button button-small button-dark">Выбрать материал <span aria-hidden><Chevron /></span></Link>
          </div>
        </div>
      </div>
    </header>
  );
}
