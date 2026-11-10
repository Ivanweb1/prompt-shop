// Иконка корзины, тонкая линия в духе стрелки-галочки
export function CartIcon() {
  return (
    <svg className="cart-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 4h2.2l2.2 10.4a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.2L20.2 8H6.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.6" cy="19.3" r="1.3" fill="currentColor" />
      <circle cx="17" cy="19.3" r="1.3" fill="currentColor" />
    </svg>
  );
}
