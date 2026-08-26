import Link from "next/link";
import { ArrowRight, Building2, Check, ClipboardCheck, ExternalLink, FileCheck2, HelpCircle, MapPin, ShieldCheck, TriangleAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { blogPosts, permitDetail } from "@/data/site";
import { publishedCaseExamples as caseExamples } from "@/data/case-examples";

const relatedPost = blogPosts.find((post) => post.category === "각종 인허가");
const relatedExample = caseExamples.find((item) => item.category === "licensing");
const canonical = "https://kim-taehoon-administrative-office.geosangbruce.chatgpt.site/services/permits";

export function PermitDetail() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: "각종 인허가 행정업무", serviceType: "사업 인허가 행정절차 지원", provider: { "@type": "ProfessionalService", name: "가든 행정사사무소" }, url: canonical },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: canonical.replace("/services/permits", "") }, { "@type": "ListItem", position: 2, name: "업무 분야", item: canonical.replace("/permits", "") }, { "@type": "ListItem", position: 3, name: "각종 인허가", item: canonical }] },
      { "@type": "FAQPage", mainEntity: permitDetail.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <section className="permit-hero"><div className="shell permit-hero-grid">
      <div className="permit-hero-copy"><p className="eyebrow">LICENSE & PERMIT</p><h1>사업 시작에 필요한 인허가,<br/><strong>신청보다 요건 확인이 먼저입니다.</strong></h1><p>업종과 사업장, 시설기준과 관할기관을 먼저 확인하고 허가·등록·신고에 필요한 절차와 자료를 안내합니다.</p><div className="button-row"><Link className="button gold" href="/contact?service=licensing">인허가 업무 상담하기 <ArrowRight/></Link><a className="button outline-light" href="#permit-review">검토 항목 확인하기</a></div></div>
      <div className="permit-blueprint" aria-label="인허가 검토 요소"><div className="permit-sheet"><span>01 / BUSINESS REVIEW</span><Building2/><b>업종 · 사업장</b><i/><i/></div><div className="permit-stamp"><ClipboardCheck/><b>신청 전 확인</b></div><ul><li>업종 확인</li><li>입지·시설 검토</li><li>관할기관 확인</li><li>신청·보완자료 준비</li></ul></div>
    </div></section>
    <Breadcrumbs items={[{ label: "업무 분야", href: "/services" }, { label: "각종 인허가" }]}/>

    <section className="section permit-quick"><div className="shell"><div className="permit-heading"><p className="eyebrow">QUICK CHECK</p><h2>어떤 인허가 문제로 확인이 필요하신가요?</h2><p>현재 상황과 가장 가까운 항목을 선택해 주세요.</p></div><div className="immigration-question-grid">{permitDetail.quickQuestions.map((question, index) => <Link className="immigration-question-card" key={question} href="/contact?service=licensing"><span className="immigration-question-number">{String(index + 1).padStart(2, "0")}</span><strong className="immigration-question-title">{question}</strong><p className="immigration-question-description">{permitDetail.quickDescriptions[index]}</p><span className="immigration-question-action">상담 항목 선택 <ArrowRight/></span></Link>)}</div></div></section>

    <section className="section soft permit-review" id="permit-review"><div className="shell"><div className="permit-heading"><p className="eyebrow">BEFORE APPLICATION</p><h2>허가 신청서보다 먼저<br/>사업 조건을 확인해야 합니다.</h2><p>모든 업종에 같은 절차가 적용되는 것은 아닙니다. 실제 영업 내용과 지역, 규모를 기준으로 아래 요소를 구분해 확인합니다.</p></div><div className="permit-factor-grid">{permitDetail.reviewFactors.map((factor, index) => <article key={factor.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{factor.title}</h3><p>{factor.body}</p><ul>{factor.checks.map((check) => <li key={check}><Check/>{check}</li>)}</ul></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="permit-heading"><p className="eyebrow">SERVICE SCOPE</p><h2>각종 인허가 주요 지원 업무</h2><p>허가 여부를 미리 단정하지 않고, 현재 단계와 관할 기준을 확인해 필요한 지원 범위를 정합니다.</p></div><div className="permit-support-list">{permitDetail.supports.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.situation}</p></div><dl><div><dt>먼저 확인</dt><dd>{item.first}</dd></div><div><dt>지원 범위</dt><dd>{item.scope}</dd></div></dl><Link href="/contact?service=licensing">상담하기 <ArrowRight/></Link></article>)}</div></div></section>

    <section className="permit-examples"><div className="shell permit-example-layout"><div><p className="eyebrow">GENERAL CATEGORIES</p><h2>일반적인 인허가 분류 예시</h2><p>아래는 상담 범위를 파악하기 위한 일반 분류입니다. 김태훈 행정사의 전문 취급 분야로 단정하지 않으며, 구체적인 업무 가능 여부는 상담 후 확인합니다.</p></div><div className="permit-example-grid">{permitDetail.sectorExamples.map((item) => <span key={item}>{item}<small>상담 후 확인</small></span>)}</div></div></section>

    <section className="section"><div className="shell permit-consult-layout"><div><p className="eyebrow">WHEN TO CHECK</p><h2>다음 상황이라면<br/>신청 전에 확인해 보세요.</h2><p>인허가 여부는 업종명 하나만으로 판단하기 어렵습니다. 실제 영업 내용과 사업장 조건, 시설과 신청 주체를 함께 확인해야 합니다.</p><ul>{permitDetail.consultationChecks.map((item) => <li key={item}><Check/>{item}</li>)}</ul></div><aside><MapPin/><h3>상담 전, 다음 내용을 알려주세요.</h3><ul>{permitDetail.preparations.map((item) => <li key={item}>{item}</li>)}</ul><p>모든 서류를 완벽하게 준비하지 않아도 됩니다. 현재 상황과 보유 자료를 기준으로 우선 확인할 사항을 안내합니다.</p><small><ShieldCheck/>사업자등록번호·주민등록번호는 초기 상담폼에 입력하지 않습니다.</small></aside></div></section>

    <section className="section soft"><div className="shell"><div className="permit-heading center"><p className="eyebrow">PROCESS</p><h2>각종 인허가 업무 진행 절차</h2><p>업종과 관할기관에 따라 실제 단계는 달라질 수 있습니다.</p></div><ol className="permit-process">{permitDetail.process.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>

    <section className="section"><div className="shell permit-mistake-layout"><div><p className="eyebrow">COMMON MISTAKES</p><h2>인허가 과정에서<br/>자주 놓치는 부분</h2><p>계약과 공사 전에 순서를 확인하면 불필요한 시간과 비용을 줄이는 데 도움이 됩니다.</p></div><div className="permit-mistakes">{permitDetail.mistakes.map(([mistake, direction], index) => <article key={mistake}><span>0{index + 1}</span><div><small>흔한 실수</small><b>{mistake}</b></div><ArrowRight/><div><small>확인 방향</small><strong>{direction}</strong></div></article>)}</div></div></section>

    <section className="permit-principles"><div className="shell"><div className="permit-heading"><p className="eyebrow">WORK PRINCIPLES</p><h2>신청서 작성에 앞서<br/>사업의 실제 조건부터 확인합니다.</h2></div><div className="permit-principle-grid">{permitDetail.principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section className="section"><div className="shell permit-caution"><TriangleAlert/><div><p className="eyebrow">PLEASE NOTE</p><h2>인허가 신청 전 확인해 주세요.</h2><ul>{permitDetail.cautions.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

    <section className="section soft"><div className="shell permit-official"><div><p className="eyebrow">OFFICIAL INFORMATION</p><h2>최신 기준은 공식 기관과 관할부서에서 확인합니다.</h2><p>민원 명칭, 제출자료와 접수기관은 업종과 지역에 따라 달라질 수 있습니다.</p><small>공식 정보 최종 확인일: {permitDetail.lastReviewed}</small></div><div>{permitDetail.officialSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink/></a>)}</div></div></section>

    <section className="section"><div className="shell permit-faq"><div><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>먼저 핵심을 답하고, 개별 사안은 최신 공식 기준으로 다시 확인합니다.</p></div><div className="faq-list">{permitDetail.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>

    {(relatedExample || relatedPost) && <section className="section permit-related"><div className="shell"><div className="permit-heading"><p className="eyebrow">RELATED CONTENT</p><h2>관련 진행 예시와 안내 글</h2></div><div className="permit-related-grid">{relatedExample && <article><small>업무 진행 예시</small><h3>{relatedExample.title}</h3><p>{relatedExample.summary}</p><Link href={`/cases/${relatedExample.slug}`}>진행 예시 보기 <ArrowRight/></Link></article>}{relatedPost && <article><small>발행된 블로그</small><h3>{relatedPost.title}</h3><p>{relatedPost.summary}</p><Link href={`/blog/${relatedPost.slug}`}>안내 글 보기 <ArrowRight/></Link></article>}</div></div></section>}

    <section className="permit-final"><div className="shell"><HelpCircle/><div><p className="eyebrow">CONSULTATION</p><h2>계약과 공사를 시작하기 전에,<br/><strong>사업에 필요한 인허가부터 확인하세요.</strong></h2><p>사업 내용과 예정 장소, 현재 진행 단계를 알려주시면 상담 가능한 업무와 우선 확인할 사항을 안내해 드립니다.</p></div><div className="button-row"><Link className="button gold" href="/contact?service=licensing">인허가 업무 상담하기</Link><Link className="button outline-light" href="/services">전체 업무 분야 보기</Link></div></div></section>
  </>;
}
