import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import Image from "next/image";
import Link from "next/link";

export default function ThanksPage() { return <section className="thanks-page"><div className="thanks-card"><Image src={asset("/brand/logo-mark-inverse.svg")} alt="" width={72} height={72} /><div className="descriptor light-muted">ЗАКАЗ ОФОРМЛЕН</div><h1>Спасибо<br /><span className="highlight">материал</span> придёт на почту</h1><p>Сейчас это демонстрационный сценарий. После подключения ЮKassa здесь появится номер реального заказа</p><Link href="/" className="button button-blue">На главную <span><Chevron /></span></Link></div></section>; }
