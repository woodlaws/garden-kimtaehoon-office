import Link from "next/link";
import { ArrowRight, Check, Clock3, ExternalLink, FileCheck2, Globe2, HelpCircle, ShieldCheck, TriangleAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { blogPosts, immigrationDetail, services } from "@/data/site";

const service = services.find((item) => item.slug === "immigration-visa")!;
const relatedPost = blogPosts.find((post) => service.blogCategories.includes(post.category));
const quickDescriptions = [
  "체류기간 연장 관련 확인사항을 안내합니다.",
  "현재 자격과 변경 목적을 먼저 확인합니다.",
  "활동 목적에 맞는 체류 절차를 살펴봅니다.",
  "초청 목적과 관계 자료를 함께 확인합니다.",
  "등록·신고 대상과 관할을 확인합니다.",
  "변경·추가 절차와 준비사항을 살펴봅니다.",
  "체류 이력에 맞는 준비 순서를 확인합니다.",
  "기관 요청 내용과 답변기한을 먼저 봅니다.",
] as const;

export function ImmigrationVisaDetail() {
  const canonical = "https://kim-taehoon-administrative-office.geosangbruce.chatgpt.site/services/immigration-visa";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: "출입국·비자 행정 상담", serviceType: "출입국·비자 행정절차 지원", provider: { "@type": "ProfessionalService", name: "가든 행정사사무소" }, url: canonical },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: canonical.replace("/services/immigration-visa", "") }, { "@type": "ListItem", position: 2, name: "업무 분야", item: canonical.replace("/immigration-visa", "") }, { "@type": "ListItem", position: 3, name: "출입국·비자", item: canonical }] },
      { "@type": "FAQPage", mainEntity: immigrationDetail.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <section className="immigration-hero">
      <div className="shell immigration-hero-grid">
        <div>
          <p className="eyebrow">IMMIGRATION & VISA</p>
          <h1>출입국·비자,<br/><strong>현재 상황부터 정확히</strong> 확인합니다.</h1>
          <p>체류기간 연장과 자격 변경, 초청·등록·영주·국적 절차는 개인의 이력과 목적에 따라 달라집니다. 국적, 현재 체류자격, 만료일을 기준으로 필요한 다음 단계를 정리해 드립니다.</p>
          <div className="button-row"><Link className="button gold" href="/contact?service=immigration">출입국·비자 상담 신청 <ArrowRight/></Link><a className="button outline-light" href="#quick-check">내 상황 빠르게 확인</a></div>
        </div>
        <aside aria-label="상담 전 확인사항">
          <Globe2/>
          <p>상담 전 세 가지만 확인해 주세요</p>
          <ol><li><span>01</span>현재 체류자격</li><li><span>02</span>체류기간 만료일</li><li><span>03</span>한국에서 하려는 활동</li></ol>
          <small><Clock3/> 공식 정보 최종 확인 {immigrationDetail.lastReviewed}</small>
        </aside>
      </div>
    </section>
    <Breadcrumbs items={[{ label: "업무 분야", href: "/services" }, { label: "출입국·비자" }]}/>

    <section className="section immigration-quick" id="quick-check"><div className="shell">
      <div className="immigration-heading"><p className="eyebrow">QUICK CHECK</p><h2>지금 어떤 문제로 확인이 필요한가요?</h2><p>가장 가까운 항목을 선택하면 출입국·비자 상담 항목으로 이어집니다.</p></div>
      <div className="immigration-question-grid">{immigrationDetail.quickQuestions.map((question, index) => <Link className="immigration-question-card" key={question} href="/contact?service=immigration"><span className="immigration-question-number">{String(index + 1).padStart(2, "0")}</span><strong className="immigration-question-title">{question}</strong><p className="immigration-question-description">{quickDescriptions[index]}</p><span className="immigration-question-action">상담 항목 선택 <ArrowRight/></span></Link>)}</div>
    </div></section>

    <section className="section soft"><div className="shell">
      <div className="immigration-heading"><p className="eyebrow">SERVICE SCOPE</p><h2>주요 지원 업무</h2><p>정해진 답을 먼저 제시하기보다, 사실관계와 공식 기준을 대조해 필요한 업무 범위를 구분합니다.</p></div>
      <div className="immigration-scope-grid">{immigrationDetail.scopes.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    </div></section>

    <section className="section immigration-prep"><div className="shell immigration-prep-layout">
      <div><p className="eyebrow">FIRST CONSULTATION</p><h2>상담 전, 이 다섯 가지를<br/>메모해 주세요.</h2><ul>{immigrationDetail.checklist.map((item) => <li key={item}><Check/>{item}</li>)}</ul><p className="immigration-privacy"><ShieldCheck/>여권번호·외국인등록번호·사본 파일은 초기 상담폼에 입력하거나 첨부하지 않습니다.</p></div>
      <div className="immigration-prep-cards">{immigrationDetail.preparations.map((item) => <article key={item.title}><FileCheck2/><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
    </div></section>

    <section className="section immigration-process-section"><div className="shell">
      <div className="immigration-heading center"><p className="eyebrow">PROCESS</p><h2>업무 진행 과정</h2><p>업무 범위에 동의한 뒤 필요한 단계만 순서대로 진행합니다.</p></div>
      <ol className="immigration-process">{immigrationDetail.process.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
    </div></section>

    <section className="immigration-principles"><div className="shell"><div className="immigration-heading"><p className="eyebrow">WORK PRINCIPLES</p><h2>출입국 업무를 대하는 네 가지 원칙</h2></div><div className="immigration-principle-grid">{immigrationDetail.principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section className="section"><div className="shell immigration-caution-layout">
      <div><p className="eyebrow">PLEASE NOTE</p><h2>신청 전에 꼭 확인하세요.</h2><p>아래 내용은 일반 안내입니다. 실제 신청 시에는 관할 기관과 최신 공식 기준을 다시 확인합니다.</p></div>
      <ul>{immigrationDetail.cautions.map((item) => <li key={item}><TriangleAlert/>{item}</li>)}</ul>
    </div></section>

    <section className="section soft"><div className="shell immigration-info-layout">
      <div><p className="eyebrow">OFFICIAL INFORMATION</p><h2>최신 정보는 공식 기관에서 확인합니다.</h2><p>법령과 지침은 변경될 수 있습니다. 아래 공식 채널을 기준으로 상담 시점의 내용을 다시 확인합니다.</p><small>공식 정보 최종 확인일: {immigrationDetail.lastReviewed}</small></div>
      <div className="immigration-source-list">{immigrationDetail.officialSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.label}</span><ExternalLink/></a>)}</div>
    </div></section>

    <section className="section"><div className="shell immigration-faq-layout"><div><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>개별 사안의 정확한 판단은 관련 자료와 최신 공식 기준을 확인한 뒤 안내합니다.</p></div><div className="faq-list">{immigrationDetail.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>

    {relatedPost && <section className="section immigration-related"><div className="shell immigration-related-inner"><div><p className="eyebrow">RELATED GUIDE</p><h2>체류자격 변경 전 확인할 항목</h2><p>{relatedPost.summary}</p></div><Link className="button outline" href={`/blog/${relatedPost.slug}`}>관련 글 읽기 <ArrowRight/></Link></div></section>}

    <section className="immigration-final"><div className="shell"><HelpCircle/><div><p className="eyebrow">CONSULTATION</p><h2>내 상황에 맞는 출입국 절차,<br/><strong>기초 사실부터 함께 확인하겠습니다.</strong></h2><p>국적, 현재 체류자격, 만료일과 원하는 활동을 알려주세요. 민감한 식별정보는 입력하지 않아도 됩니다.</p></div><Link className="button gold" href="/contact?service=immigration">출입국·비자 상담 신청 <ArrowRight/></Link></div></section>
  </>;
}
