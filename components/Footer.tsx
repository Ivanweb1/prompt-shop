import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-panel">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/prompt-shop/brand/logo-mark-primary.svg" alt="" width={48} height={48} />
            <p>Цифровые материалы для дизайнеров, которые работают с AI</p>
          </div>
          <div>
            <div className="descriptor">НАВИГАЦИЯ</div>
            <Link href="/#catalog">Каталог</Link>
            <Link href="/#bundles">Комплекты</Link>
            <Link href="/#about">Об авторе</Link>
          </div>
          <div>
            <div className="descriptor">ИНФОРМАЦИЯ</div>
            <Link href="/offer">Оферта</Link>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <a href="https://t.me/" target="_blank" rel="noreferrer">Написать в Telegram</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Иван Панькин</span><span>Первая версия магазина</span></div>
      </div>
    </footer>
  );
}
