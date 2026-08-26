import type { Metadata } from "next";
import { Check, ClipboardCheck, FileSearch, ListChecks, SearchCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { CaseExamplesGrid } from "@/components/CaseExamplesGrid";
import { CASE_EXAMPLE_NOTICE, publishedCaseExamples } from "@/data/case-examples";

const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://garden-kimtaehoon-office.vercel.app";
const title = "업무 진행 예시 | 김태훈 행정사";
const description = "출입국·비자, 인허가, 행정심판, 기업행정, 부동산 행정 및 행정서류 업무의 일반적인 검토 과정과 준비자료를 안내합니다.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: `${origin}/cases` },
  openGraph: { title, description, url: `${origin}/cases`, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

const keywords = [[SearchCheck, "상황 확인"], [FileSearch, "필요자료 검토"], [ListChecks, "진행절차 안내"], [ClipboardCheck, "업무 범위 확인"]] as const;

export default function CasesPage() {
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: origin }, { "@type": "ListItem", position: 2, name: "업무 진행 예시", item: `${origin}/cases` }] },
    { "@type": "CollectionPage", name: title, description, url: `${origin}/cases`, mainEntity: { "@type": "ItemList", itemListElement: publishedCaseExamples.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${origin}/cases/${item.slug}` })) } },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <section className="cases-hero"><div className="shell cases-hero-grid"><div><p className="eyebrow">WORK EXAMPLES</p><h1>상황별 업무 진행 과정을<br/><strong>쉽게 확인해보세요</strong></h1><p>출입국·비자, 인허가, 행정심판, 기업행정 등 주요 업무가 어떤 과정으로 검토되고 진행되는지 일반적인 예시를 통해 안내합니다.</p></div><ul>{keywords.map(([Icon, label]) => <li key={label}><Icon/><span>{label}</span></li>)}</ul></div></section>
    <Breadcrumbs items={[{ label: "업무 진행 예시" }]}/>
    <section className="section cases-index"><div className="shell">
      <div className="cases-disclosure"><Check/><div><strong>업무 진행 예시 안내</strong><p>{CASE_EXAMPLE_NOTICE}</p></div></div>
      <div className="cases-heading"><p className="eyebrow">EXPLORE BY FIELD</p><h2>업무 분야별 진행 예시</h2><p>분야를 선택하면 해당하는 일반적인 검토 과정만 모아볼 수 있습니다.</p></div>
      <CaseExamplesGrid items={publishedCaseExamples}/>
    </div></section>
  </>;
}
