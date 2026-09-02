import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Check, ExternalLink, Phone, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { CaseEvidenceGallery } from "@/components/CaseEvidenceGallery";
import { CASE_DISCLAIMER, legacyCaseRedirects, publishedCaseExamples } from "@/data/case-examples";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

export function generateStaticParams() { return publishedCaseExamples.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = publishedCaseExamples.find((value) => value.slug === slug);
  if (!item) return { title: "업무사례 | 가든 행정사사무소" };
  const primaryImage = item.evidence[0];
  return publicMetadata({
    title: `${item.title} | 가든 행정사사무소`,
    description: item.summary,
    path: `/cases/${item.slug}`,
    openGraphType: "article",
    image: primaryImage ? { url: siteUrl(primaryImage.src), width: primaryImage.width, height: primaryImage.height, alt: primaryImage.alt } : null,
  });
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = publishedCaseExamples.find((value) => value.slug === slug);
  if (!item) {
    const destination = legacyCaseRedirects[slug];
    if (destination) redirect(destination);
    notFound();
  }

  const others = publishedCaseExamples.filter((value) => value.slug !== item.slug).slice(0, 3);
  const url = siteUrl(`/cases/${item.slug}`);
  const contactHref = `/contact?service=${item.contactService}&case=${item.slug}`;
  const structuredData = { "@graph": [
    breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "업무사례", path: "/cases" }, { name: item.title, path: `/cases/${item.slug}` }]),
    {
      "@type": "Article",
      headline: item.title,
      description: item.summary,
      url,
      mainEntityOfPage: url,
      dateModified: item.updatedAt,
      articleSection: item.categoryLabel,
      ...(item.evidence[0] ? { image: siteUrl(item.evidence[0].src) } : {}),
      author: { "@type": "Person", name: "김태훈 행정사" },
      publisher: { "@type": "Organization", name: "가든 행정사사무소", url: siteUrl("/") },
    },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}/>
    <Breadcrumbs items={[{ label: "업무사례", href: "/cases" }, { label: item.title }]}/>
    <article className="case-detail">
      <header className="case-detail-hero"><div className="shell">
        <div className="case-detail-meta"><span>{item.actualCaseVerified ? "원문 확인 업무사례" : "원문 확인 업무 안내"}</span><b>{item.categoryLabel}</b></div>
        <h1>{item.title}</h1><p>{item.summary}</p>
      </div></header>

      <div className="shell case-detail-layout"><div className="case-detail-body">
        <section><p className="eyebrow">BACKGROUND</p><h2>상담 또는 의뢰 배경</h2><div className="case-situation">{item.background.map((value) => <p key={value}>{value}</p>)}</div></section>
        <section><p className="eyebrow">ADMINISTRATIVE ISSUES</p><h2>주요 행정 과제</h2><ul className="case-content-list">{item.administrativeIssues.map((value) => <li key={value}><Check/>{value}</li>)}</ul></section>
        <section><p className="eyebrow">WORK PROCESS</p><h2>검토 및 진행 내용</h2><ul className="case-content-list">{item.workProgress.map((value) => <li key={value}><Check/>{value}</li>)}</ul></section>
        <section><p className="eyebrow">RESULT</p><h2>확인된 결과</h2><div className={`case-result${item.actualCaseVerified ? "" : " source-limited"}`}><Check/><div>{item.result.map((value) => <p key={value}>{value}</p>)}</div></div></section>
        <CaseEvidenceGallery items={item.evidence}/>
        <section><p className="eyebrow">BEFORE CONSULTATION</p><h2>비슷한 상황이라면 확인할 점</h2><ul className="case-check-grid">{item.similarChecks.map((value) => <li key={value}><Check/>{value}</li>)}</ul></section>
        <section className="case-related-service"><div><p className="eyebrow">RELATED SERVICE</p><h2>{item.relatedServiceLabel}</h2><p>관련 업무의 지원 범위와 상담 전 확인사항을 살펴보세요.</p></div><Link className="button outline" href={item.relatedService}>관련 업무 안내 <ArrowRight/></Link></section>
      </div></div>

      <section className="case-consult-cta"><div className="shell">
        <div><p className="eyebrow">CONSULTATION</p><h2>비슷한 행정 문제로 고민하고 계십니까?</h2><p>사례와 유사해 보여도 신청인의 상황, 관할기관 및 적용 기준에 따라 필요한 절차와 결과는 달라질 수 있습니다. 현재 상황과 보유 자료를 알려주시면 상담을 통해 검토 방향을 안내해 드립니다.</p><small>상담 가능 시간 · 평일 09:00~19:00</small></div>
        <div className="case-cta-actions"><a className="button gold" href="tel:01058345300"><Phone/> 010-5834-5300</a><Link className="button outline-light" href={contactHref}>상담 신청하기 <ArrowRight/></Link><Link className="button outline-light" href="/cases">다른 업무사례</Link></div>
      </div></section>

      <section className="section case-source"><div className="shell case-detail-layout">
        <div className="case-source-card"><div><p className="eyebrow">ORIGINAL SOURCE</p><h2>{item.originalTitle}</h2><p>홈페이지 내용은 이 공개 원문에서 확인되는 범위로 요약했습니다.</p></div><a className="button outline" href={item.originalUrl} target="_blank" rel="noopener noreferrer">네이버 블로그에서 원문 보기 <ExternalLink/></a></div>
        <div className="case-final-disclaimer"><ShieldCheck/><p>{CASE_DISCLAIMER}</p></div>
      </div></section>

      <section className="section case-other-examples"><div className="shell"><div className="cases-heading"><p className="eyebrow">OTHER CASES</p><h2>다른 업무사례</h2></div><div className="case-other-grid">{others.map((value) => <Link key={value.id} href={`/cases/${value.slug}`}><small>{value.categoryLabel} · 업무사례</small><strong>{value.title}</strong><span>사례 상세 보기 <ArrowRight/></span></Link>)}</div></div></section>
    </article>
  </>;
}
