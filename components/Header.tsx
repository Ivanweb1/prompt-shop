import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import { BurgerMenu } from "@/components/BurgerMenu";
import { CartButton } from "@/components/CartButton";
import { HeaderSearch } from "@/components/HeaderSearch";
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
          <HeaderSearch className="search-in-bar" />
          <div className="header-actions">
            <CartButton />
            <Link href="/#catalog" className="button button-small button-dark">Выбрать материал <span aria-hidden><Chevron /></span></Link>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
