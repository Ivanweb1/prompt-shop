"use client";

import { Chevron } from "@/components/Chevron";
import Link from "next/link";
import { FormEvent, useState } from "react";
import type { CartItem } from "@/lib/cart";
import { submitOrder } from "@/lib/order";

export function CheckoutForm({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    const telegram = "@" + String(form.get("telegram")).trim().replace(/^@/, "");
    const result = await submitOrder({ email: String(form.get("email")).trim(), telegram, adsConsent: form.get("ads") === "on", items });
    if (result.ok) {
      window.location.href = result.redirect; // страница оплаты ЮKassa; корзина очистится на /thanks
      return;
    }
    setError(result.error);
    setLoading(false);
  }
  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label><span>Email для получения материала</span><input name="email" type="email" placeholder="hello@example.com" required autoComplete="email" /></label>
      <label>
        <span>Telegram</span>
        <span className="input-prefix"><i aria-hidden>@</i><input name="telegram" type="text" placeholder="username" required autoComplete="off" spellCheck={false} pattern="@?[A-Za-z0-9_]{5,32}" title="Юзернейм Telegram: латиница, цифры и _, от 5 символов" /></span>
        <small className="field-hint">Проверьте, правильно ли написан юзернейм — без ошибок мы не сможем с вами связаться</small>
      </label>
      <label className="consent"><input type="checkbox" required /><span>Соглашаюсь с условиями <Link href="/offer/" target="_blank">оферты</Link> и <Link href="/privacy/" target="_blank">обработкой персональных данных</Link></span></label>
      <label className="consent consent-ads"><input name="ads" type="checkbox" /><span>Согласен получать рекламные и информационные рассылки о новых материалах и скидках</span></label>
      <button className="button button-blue button-wide" disabled={loading || items.length === 0}>{loading ? "Готовим заказ" : "Оплатить"}<span aria-hidden><Chevron /></span></button>
      {error && <p className="form-note form-error" role="alert">{error}</p>}
      <p className="form-note">Оплата на странице ЮKassa: карта, СБП, SberPay, T-Pay. Материал придёт на email сразу после оплаты</p>
    </form>
  );
}
