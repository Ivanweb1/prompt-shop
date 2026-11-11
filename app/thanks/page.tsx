import { asset } from "@/lib/asset";
import { Chevron } from "@/components/Chevron";
import Image from "next/image";
import Link from "next/link";
import { ClearCart } from "@/components/ClearCart";

export default function ThanksPage() { return <section className="thanks-page"><div className="thanks-card"><ClearCart /><Image src={asset("/brand/logo-mark-inverse.svg")} alt="" width={72} height={72} /><div className="descriptor light-muted">СПАСИБО ЗА ЗАКАЗ</div><h1>Готово<br /><span className="highlight">письмо</span> придёт на почту</h1><p>В течение нескольких минут придёт письмо со ссылками на материалы или с тем, как получить доступ к курсу. Если его нет — проверьте «Спам» или напишите нам в Telegram</p><Link href="/" className="button button-blue">На главную <span><Chevron /></span></Link></div></section>; }
