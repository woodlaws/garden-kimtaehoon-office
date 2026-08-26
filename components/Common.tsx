import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-hero"><div className="shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></section>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="shell breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link>{items.map((item, i) => <span key={item.label}><ChevronRight/>{item.href && i < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : <b>{item.label}</b>}</span>)}</nav>;
}

export function CTA() {
  return <section className="cta-band"><div className="shell cta-inner"><div><p className="eyebrow">CONSULTATION</p><h2>어떤 행정 절차로 고민하고 계신가요?</h2><p>자료를 확인한 뒤 가능한 절차와 준비사항을 차분히 안내합니다.</p></div><div className="button-row"><Link className="button gold" href="/contact">온라인 상담 신청</Link><Link className="button outline-light" href="/services">업무 분야 보기</Link></div></div></section>;
}
