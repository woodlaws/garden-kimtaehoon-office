import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Check, FileText, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { CASE_EXAMPLE_NOTICE, publishedCaseExamples } from "@/data/case-examples";

const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://garden-kimtaehoon-office.vercel.app";

export function generateStaticParams() { return publishedCaseExamples.map(item => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = publishedCaseExamples.find(value => value.slug === slug);
  if (!item) return { title: "업무 진행 예시" };
  const title = `${item.title} | 업무 진행 예시`;
  const description = `${item.categoryLabel} 업무의 일반적인 상황을 바탕으로 확인사항, 준비자료와 검토 과정을 안내합니다. 실제 수행 사례가 아닙니다.`;
  const url = `${origin}/cases/${item.slug}`;
  return { title: { absolute: `${title} | 김태훈 행정사` }, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [] }, twitter: { card: "summary", title, description, images: [] } };
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = publishedCaseExamples.find(value => value.slug === slug);
  if (!item) notFound();
  const others = publishedCaseExamples.filter(value => value.slug !== item.slug).slice(0, 3);
  const url = `${origin}/cases/${item.slug}`;
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: origin }, { "@type": "ListItem", position: 2, name: "업무 진행 예시", item: `${origin}/cases` }, { "@type": "ListItem", position: 3, name: item.title, item: url }] },
    { "@type": "WebPage", name: `${item.title} | 업무 진행 예시`, description: item.summary, url, datePublished: item.publishedAt, dateModified: item.updatedAt, about: { "@type": "Thing", name: item.categoryLabel }, isPartOf: { "@type": "WebSite", name: "김태훈 행정사 홈페이지", url: origin } },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <Breadcrumbs items={[{ label: "업무 진행 예시", href: "/cases" }, { label: item.title }]}/>
    <article className="case-detail">
      <header className="case-detail-hero"><div className="shell"><div className="case-detail-meta"><span>업무 진행 예시</span><b>{item.categoryLabel}</b></div><h1>{item.title}</h1><p>{item.summary}</p><div className="case-detail-notice"><ShieldCheck/><span>{CASE_EXAMPLE_NOTICE}</span></div></div></header>
      <div className="shell case-detail-layout"><div className="case-detail-body">
        <section><p className="eyebrow">SITUATION</p><h2>의뢰 상황</h2><p className="case-situation">{item.situation}</p></section>
        <section><p className="eyebrow">KEY ISSUES</p><h2>먼저 확인할 사항</h2><ul className="case-check-grid">{item.keyIssues.map(value => <li key={value}><Check/>{value}</li>)}</ul></section>
        <section><p className="eyebrow">DOCUMENTS</p><h2>준비하면 좋은 자료</h2><div className="case-document-grid">{item.documents.map(value => <div key={value}><FileText/><span>{value}</span></div>)}</div><p className="case-document-note">자료가 모두 준비되지 않았더라도 상담은 가능합니다. 현재 보유한 자료를 먼저 확인한 후 추가로 필요한 사항을 안내합니다.</p><p className="case-sensitive-note"><ShieldCheck/>주민등록번호, 여권번호, 계좌정보 등 민감한 개인정보는 온라인 상담 폼에 직접 입력하지 마세요.</p></section>
        <section><p className="eyebrow">PROCESS</p><h2>예상 진행 절차</h2><ol className="case-process-list">{item.process.map((value, index) => <li key={value}><span>{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong></li>)}</ol></section>
        <section><p className="eyebrow">DIRECTION</p><h2>진행 방향</h2><ul className="case-direction-list">{item.direction.map(value => <li key={value}><Check/>{value}</li>)}</ul></section>
        <section className="case-cautions"><AlertTriangle/><div><p className="eyebrow">CAUTION</p><h2>반드시 확인할 주의사항</h2><ul>{item.cautions.map(value => <li key={value}>{value}</li>)}</ul></div></section>
        <section className="case-related-service"><div><p className="eyebrow">RELATED SERVICE</p><h2>{item.categoryLabel} 업무 안내</h2><p>관련 업무의 지원 범위와 상담 전 확인사항을 먼저 살펴보세요.</p></div><Link className="button outline" href={item.relatedService}>관련 업무 페이지 <ArrowRight/></Link></section>
      </div></div>
      <section className="case-consult-cta"><div className="shell"><div><p className="eyebrow">CONSULTATION</p><h2>비슷한 상황으로 확인이 필요하신가요?</h2><p>실제 진행 가능 여부와 필요한 자료는 개별 상황을 확인한 후 안내해드립니다.</p></div><div className="case-cta-actions"><Link className="button gold" href={`/contact?service=${item.contactService}`}>상담 신청하기 <ArrowRight/></Link><Link className="button outline-light" href="/services">업무 분야 전체 보기</Link><Link className="button outline-light" href="/cases">다른 진행 예시 보기</Link></div></div></section>
      <section className="section case-other-examples"><div className="shell"><div className="cases-heading"><p className="eyebrow">OTHER EXAMPLES</p><h2>다른 업무 진행 예시</h2></div><div className="case-other-grid">{others.map(value => <Link key={value.id} href={`/cases/${value.slug}`}><small>{value.categoryLabel} · 업무 진행 예시</small><strong>{value.title}</strong><span>진행 과정 보기 <ArrowRight/></span></Link>)}</div></div></section>
    </article>
  </>;
}
