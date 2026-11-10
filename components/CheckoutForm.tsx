"use client";

import { Chevron } from "@/components/Chevron";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "@/lib/order";

export function CheckoutForm({ type, item }: { type: "product" | "bundle"; item: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    const result = await submitOrder({ email: String(form.get("email")), itemType: type, itemSlug: item });
    if (result.ok) router.push(`/thanks?order=${encodeURIComponent(result.orderId)}`);
  }
  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label><span>Email для получения материала</span><input name="email" type="email" placeholder="hello@example.com" required autoComplete="email" /></label>
      <label className="consent"><input type="checkbox" required /><span>Соглашаюсь с условиями <a href="/offer" target="_blank">оферты</a> и обработкой данных</span></label>
      <button className="button button-blue button-wide" disabled={loading}>{loading ? "Готовим заказ" : "Оплатить"}<span aria-hidden><Chevron /></span></button>
      <p className="form-note">Демо-режим: платёжный сервис будет подключён на втором этапе</p>
    </form>
  );
}
