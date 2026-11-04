import { Suspense } from "react";
import { CheckoutPageContent } from "@/components/CheckoutPageContent";

function CheckoutFallback() {
  return <section className="simple-page"><div className="container narrow"><div className="descriptor">ОФОРМЛЕНИЕ</div><h1>Готовим заказ</h1></div></section>;
}

export default function CheckoutPage() {
  return <Suspense fallback={<CheckoutFallback />}><CheckoutPageContent /></Suspense>;
}
