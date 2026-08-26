import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { blogPosts, caseExamples, services, siteConfig } from "@/data/site";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://kim-taehoon-administrative-office.geosangbruce.chatgpt.site";

export const metadata: Metadata = {
  title: { absolute: "업무 분야 | 김태훈 행정사·가든 행정사사무소" },
  description: "출입국·비자, 기업행정, 각종 인허가, 행정심판, 토지·부동산 행정, 내용증명과 행정서류 등 김태훈 행정사의 주요 업무 분야를 안내합니다.",
  alternates: { canonical: "/services" },
  openGraph: { title: "업무 분야 | 김태훈 행정사·가든 행정사사무소", description: "현재 상황에 맞는 행정업무와 준비사항, 진행 절차를 확인하세요.", url: "/services", type: "website", locale: "ko_KR", images: [] },
  twitter: { card: "summary", title: "김태훈 행정사 업무 분야", description: "6개 주요 행정업무와 상담 진행 방식을 안내합니다.", images: [] },
};

const serviceFaqs = [
  ["어떤 업무에 해당하는지 몰라도 상담할 수 있나요?", "네. 현재 상황과 받은 문서, 원하는 처리 방향을 알려주시면 상담 가능한 업무인지 먼저 확인합니다. 정확한 분류는 관련 자료를 확인한 뒤 안내할 수 있습니다."],
  ["상담 전에 어떤 자료를 준비해야 하나요?", "기관에서 받은 처분서나 안내문, 기존 신청서류와 사실관계를 시간순으로 정리한 메모가 도움이 됩니다. 업무에 따라 추가 자료가 필요할 수 있습니다."],
  ["전화나 온라인으로 상담할 수 있나요?", "업무에 따라 전화 또는 온라인으로 상담을 시작할 수 있습니다. 현재 전화번호는 확정 전이므로 온라인 상담을 통해 문의해 주세요."],
  ["업무 비용은 어떻게 정해지나요?", "업무 범위와 난이도, 준비된 자료와 예상 소요시간을 확인한 뒤 안내합니다. 상담 단계에서 확인되지 않은 비용을 임의로 확정하지 않습니다."],
  ["업무 처리 기간은 얼마나 걸리나요?", "업무 종류와 관할 기관, 보완 여부에 따라 달라질 수 있습니다. 자료 확인 후 예상되는 일정과 변동 가능성을 안내합니다."],
  ["다른 지역에서도 업무를 의뢰할 수 있나요?", "업무 성격과 관할, 원본 확인이나 방문 필요 여부에 따라 달라집니다. 지역과 현재 상황을 문의 내용에 함께 적어주시면 확인 후 안내합니다."],
  ["본인이 직접 방문해야 하나요?", "전화·온라인으로 검토를 시작할 수 있는 업무도 있지만 본인 확인이나 원본 제출이 필요한 경우 방문이 필요할 수 있습니다. 업무별 절차를 확인한 뒤 안내합니다."],
  ["상담 후 반드시 계약해야 하나요?", "상담은 현재 상황과 가능한 절차를 확인하는 단계입니다. 안내받은 업무 범위와 비용을 검토한 뒤 의뢰 여부를 결정할 수 있습니다."],
] as const;

const serviceProcess = [
  ["상담 접수", "문의 내용과 필요한 업무를 확인합니다."],
  ["상황 및 자료 확인", "현재 상황과 보유하고 있는 서류를 검토합니다."],
  ["절차와 준비사항 안내", "필요한 절차, 자료와 진행 방향을 설명합니다."],
  ["계약 및 업무 착수", "업무 범위와 비용을 확인한 후 업무를 시작합니다."],
  ["진행 상황 공유", "진행 단계와 추가로 필요한 사항을 안내합니다."],
  ["결과 안내", "처리 결과와 이후 확인할 내용을 안내합니다."],
] as const;

export default function ServicesPage() {
  const orderedServices = [...services].sort((a, b) => a.order - b.order);
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: siteOrigin }, { "@type": "ListItem", position: 2, name: "업무 분야", item: `${siteOrigin}/services` }] },
    { "@type": "CollectionPage", name: "김태훈 행정사 업무 분야", url: `${siteOrigin}/services`, mainEntity: { "@type": "ItemList", itemListElement: orderedServices.map((service, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: service.title, description: service.detail, url: `${siteOrigin}${service.detailPath}`, provider: { "@type": "ProfessionalService", name: siteConfig.name, url: siteOrigin } } })) } },
    { "@type": "FAQPage", mainEntity: serviceFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <section className="services-hero"><div className="shell services-hero-inner">
      <div className="services-hero-copy"><p className="eyebrow">ADMINISTRATIVE SERVICES</p><h1>복잡한 행정업무,<br/><strong>상황에 맞는 절차를 안내합니다.</strong></h1><p>인허가부터 기업행정·행정심판·출입국 업무까지<br/>현재 상황을 확인하고 필요한 절차와 준비사항을 안내해 드립니다.</p><div className="button-row"><a className="button gold" href="#service-finder">내 업무 분야 찾기</a><Link className="button outline-light" href="/contact">상담 신청하기</Link></div></div>
      <div className="services-hero-art" aria-hidden="true"><span/><span/><span/><div><b>01</b><i/><i/><i/></div><div><b>02</b><i/><i/></div></div>
    </div></section>
    <Breadcrumbs items={[{ label: "업무 분야" }]}/>

    <section className="section service-finder" id="service-finder"><div className="shell"><div className="services-heading center"><p className="eyebrow">QUICK FINDER</p><h2>어떤 행정업무가 필요하신가요?</h2><p>현재 겪고 있는 상황과 가장 가까운 항목을 선택해 주세요.</p></div><nav className="service-question-grid" aria-label="상황별 업무 분야 선택">{orderedServices.map((service, index) => <a key={service.slug} href={`#service-${service.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{["체류자격이나 비자 문제로 도움이 필요하신가요?", "회사나 사업 운영에 필요한 행정절차가 있으신가요?", "영업허가·등록·신고를 준비하고 계신가요?", "영업정지나 과징금 등 행정처분을 받으셨나요?", "토지나 부동산 관련 행정절차가 필요하신가요?", "내용증명이나 각종 행정서류 작성이 필요하신가요?"][index]}</strong><ArrowRight/></a>)}</nav></div></section>

    <section className="services-editorial" aria-label="핵심 업무 분야 6개">{orderedServices.map((service, index) => <article className="service-editorial-row" id={`service-${service.slug}`} key={service.slug}><div className="shell service-editorial-grid"><div className="service-editorial-summary"><span>{String(index + 1).padStart(2, "0")}</span><p className="eyebrow">{service.situation}</p><h2>{service.title}</h2><p>{service.detail}</p><div className="button-row"><Link className="button primary" href={service.detailPath}>자세히 보기 <ArrowRight/></Link><Link className="button outline" href={`/contact?service=${service.consultationQuery}`}>이 업무 상담하기</Link></div></div><div className="service-editorial-details"><h3>주요 지원 업무</h3><ul>{service.supports.map((support) => <li key={support}><Check/>{support}</li>)}</ul><div><strong>상담 전 확인하면 좋은 내용</strong><p>{service.intro}</p></div></div></div></article>)}</section>

    <section className="section service-unsure"><div className="shell service-unsure-inner"><div><p className="eyebrow">NOT SURE YET?</p><h2>어떤 업무에 해당하는지<br/>모르셔도 괜찮습니다.</h2><p>현재 상황과 받은 문서, 필요한 목적을 알려주시면 상담 가능한 업무인지 먼저 확인해 드립니다.</p></div><ol><li><span>01</span>현재 상황 정리</li><li><span>02</span>받은 문서 확인</li><li><span>03</span>상담 가능 업무 안내</li></ol><div className="button-row"><Link className="button primary" href="/contact">현재 상황 문의하기</Link><a className="button outline" href="#service-process">상담 절차 확인하기</a></div></div></section>

    <section className="section soft service-process-section" id="service-process"><div className="shell"><div className="services-heading"><p className="eyebrow">PROCESS</p><h2>상담부터 결과 안내까지<br/>진행 과정을 함께합니다.</h2></div><ol className="service-hub-process">{serviceProcess.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>

    <section className="section service-cases"><div className="shell"><div className="services-heading split"><div><p className="eyebrow">WORK EXAMPLES</p><h2>업무 진행 예시</h2><p>실제 성공 결과를 보장하는 사례가 아닌, 자료를 확인하고 절차를 정리하는 방식의 예시입니다.</p></div><Link className="text-link" href="/cases">전체 예시 보기 <ArrowRight/></Link></div><div className="service-case-list">{caseExamples.slice(0, 3).map((example, index) => <article key={example.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{example.status} · {example.category}</small><h3>{example.title}</h3><p>{example.issue}</p></div><Link href={`/cases/${example.slug}`}>사례 보기 <ArrowRight/></Link></article>)}</div></div></section>

    <section className="section soft service-blog-section"><div className="shell"><div className="services-heading split"><div><p className="eyebrow">ADMINISTRATIVE INSIGHTS</p><h2>업무와 함께 확인하면 좋은 정보</h2></div><Link className="text-link" href="/blog">행정 정보 블로그 전체보기 <ArrowRight/></Link></div><div className="service-hub-blog-grid">{blogPosts.slice(0, 3).map((post, index) => <article key={post.slug}><div className="service-blog-thumb"><span>{String(index + 1).padStart(2, "0")}</span><small>{post.category}</small></div><div><span>{post.category}</span><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.summary}</p><small>{post.date}</small><Link href={`/blog/${post.slug}`}>글 보기 <ArrowRight/></Link></div></article>)}</div></div></section>

    <section className="section service-faq"><div className="shell faq-wrap"><div><p className="eyebrow">FAQ</p><h2>업무 상담 전<br/>자주 묻는 질문</h2><p>개별 업무의 정확한 판단은 현재 상황과 자료를 확인한 뒤 안내합니다.</p></div><div className="faq-list">{serviceFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="service-final-cta"><div className="shell service-final-cta-inner"><div><p className="eyebrow">CONSULTATION</p><h2>필요한 행정절차를 찾았다면,<br/><strong>현재 상황부터 확인해 보세요.</strong></h2><p>문의 내용을 남겨주시면 확인 후 상담 가능한 업무와 준비사항을 안내해 드립니다.</p></div><div className="service-final-actions"><Link className="button gold" href="/contact">온라인 상담 신청</Link>{siteConfig.phoneHref ? <a className="button outline-light" href={siteConfig.phoneHref}><Phone/> 전화 상담</a> : <span className="button outline-light disabled" aria-disabled="true"><Phone/> 전화 상담</span>}<Link className="button outline-light" href="/about">김태훈 행정사 소개 보기</Link></div></div></section>
  </>;
}
