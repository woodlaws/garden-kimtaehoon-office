import type { Metadata } from "next";
import { Building2, Check, HeartHandshake, Scale, Sprout } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { CaseExamplesGrid } from "@/components/CaseExamplesGrid";
import { CASE_EXAMPLE_NOTICE, publishedCaseExamples } from "@/data/case-examples";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

const title = "가든 행정사사무소 업무사례";
const description = "기업 인허가와 인증, 농업경영, 노인복지사업 창업, 행정심판 및 민원행정 분야에서 진행한 가든 행정사사무소의 주요 업무사례입니다.";

export const metadata: Metadata = publicMetadata({ title, description, path: "/cases" });

const keywords = [[Building2, "기업 인허가·인증"], [Sprout, "농업경영"], [HeartHandshake, "노인복지사업"], [Scale, "행정심판·민원"]] as const;

export default function CasesPage() {
  const structuredData = { "@graph": [
    breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "업무사례", path: "/cases" }]),
    { "@type": "CollectionPage", name: title, description, url: siteUrl("/cases"), mainEntity: { "@type": "ItemList", itemListElement: publishedCaseExamples.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: siteUrl(`/cases/${item.slug}`) })) } },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}/>
    <section className="cases-hero"><div className="shell cases-hero-grid"><div><p className="eyebrow">ACTUAL WORK CASES</p><h1>가든 행정사사무소<br/><strong>업무사례</strong></h1><p>기업 인허가와 인증, 농업경영, 노인복지사업 창업, 행정심판 및 민원행정 분야에서 진행한 주요 업무사례를 소개합니다. 각 사례는 개별적인 상황과 기준에 따라 진행된 결과이며, 유사한 업무라도 구체적인 절차와 결과는 달라질 수 있습니다.</p></div><ul>{keywords.map(([Icon, label]) => <li key={label}><Icon/><span>{label}</span></li>)}</ul></div></section>
    <Breadcrumbs items={[{ label: "업무사례" }]}/>
    <section className="section cases-index"><div className="shell">
      <div className="cases-disclosure"><Check/><div><strong>업무사례 안내</strong><p>{CASE_EXAMPLE_NOTICE}</p></div></div>
      <div className="cases-heading"><p className="eyebrow">EXPLORE BY FIELD</p><h2>업무사례와 실무 안내</h2><p>원문에서 결과가 확인된 사례와 업무 절차를 설명한 안내 글을 구분해 제공합니다.</p></div>
      <CaseExamplesGrid items={publishedCaseExamples}/>
    </div></section>
  </>;
}
