import Link from "next/link";
import { ArrowRight, CalendarDays, Check, CircleAlert, ExternalLink, FileText, HelpCircle, Scale, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { appealDetail, blogPosts } from "@/data/site";
import { publishedCaseExamples as caseExamples } from "@/data/case-examples";
import { siteUrl } from "@/lib/site";

const relatedPost = blogPosts.find((post) => post.category === "행정심판");
const relatedExample = caseExamples.find((item) => item.category === "appeal");
const canonical = siteUrl("/services/appeal");

export function AppealDetail() {
  const structuredData = {"@context":"https://schema.org","@graph":[
    {"@type":"Service",name:"행정심판·행정처분 구제",serviceType:"행정처분 관련 상담 및 서류 작성 지원",provider:{"@type":"ProfessionalService",name:"가든 행정사사무소"},url:canonical},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"홈",item:canonical.replace("/services/appeal","")},{"@type":"ListItem",position:2,name:"업무 분야",item:canonical.replace("/appeal","")},{"@type":"ListItem",position:3,name:"행정심판·행정처분 구제",item:canonical}]},
    {"@type":"FAQPage",mainEntity:appealDetail.faqs.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))},
  ]};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>
    <section className="appeal-hero"><div className="shell appeal-hero-grid"><div><p className="eyebrow">ADMINISTRATIVE APPEAL</p><h1>행정처분을 받았다면,<br/><strong>처분 내용과 대응 기간부터 확인해야 합니다.</strong></h1><p>처분서와 통지받은 날짜, 처분 사유와 관련 자료를 검토하여 행정심판 등 가능한 대응 절차를 안내합니다.</p><div className="button-row"><Link className="button gold" href="/contact?service=appeal">행정처분 상담하기 <ArrowRight/></Link><a className="button outline-light" href="#appeal-deadline">우선 확인사항 보기</a></div></div><div className="appeal-document" aria-label="처분서와 대응 기간 확인 항목"><div><FileText/><b>처분서 검토</b><span>처분기관 · 처분사유 · 불복안내</span></div><aside><CalendarDays/><strong>받은 날짜</strong><small>기한 검토의 출발점</small></aside><ul>{["처분서 확인","청구기간 검토","사실관계 정리","주장·증빙자료 구성"].map((item)=><li key={item}><Check/>{item}</li>)}</ul></div></div></section>
    <Breadcrumbs items={[{label:"업무 분야",href:"/services"},{label:"행정심판·행정처분 구제"}]}/>

    <section className="appeal-deadline" id="appeal-deadline"><div className="shell appeal-deadline-grid"><div><p className="eyebrow">CHECK THE DATE FIRST</p><h2>처분서를 받은 날짜를 먼저 확인해 주세요.</h2><p><strong>일반적인 취소심판은 원칙적으로 처분이 있음을 알게 된 날부터 90일 이내, 처분이 있었던 날부터 180일 이내에 청구해야 합니다.</strong> 다만 개별 법령과 심판 유형, 고지 내용에 따라 달라질 수 있으므로 실제 사건별 확인이 필요합니다.</p><small><CircleAlert/>무효등확인심판과 부작위에 대한 의무이행심판 등은 다른 기준이 적용될 수 있습니다. 휴일·송달·고지 오류와 예외를 자동 계산하지 않으며 최종 기한은 공식기관 또는 전문가 확인이 필요합니다.</small></div><ul>{appealDetail.deadlineChecks.map((item)=><li key={item}><Check/>{item}</li>)}</ul></div></section>

    <section className="section appeal-quick"><div className="shell"><div className="appeal-heading"><p className="eyebrow">QUICK CHECK</p><h2>어떤 행정처분으로 확인이 필요하신가요?</h2><p>현재 상황과 가장 가까운 항목을 선택해 주세요. 항목에 따라 행정심판이 아닌 별도 절차가 적용될 수 있어 상담 단계에서 구분합니다.</p></div><div className="immigration-question-grid">{appealDetail.quickQuestions.map((question,index)=><Link className="immigration-question-card" key={question} href="/contact?service=appeal"><span className="immigration-question-number">{String(index+1).padStart(2,"0")}</span><strong className="immigration-question-title">{question}</strong><p className="immigration-question-description">{appealDetail.quickDescriptions[index]}</p><span className="immigration-question-action">확인 항목 선택 <ArrowRight/></span></Link>)}</div></div></section>

    <section className="section soft"><div className="shell appeal-definition"><div><p className="eyebrow">WHAT IS IT</p><h2>행정심판은 어떤 제도인가요?</h2><p>행정심판은 행정청의 위법하거나 부당한 처분 또는 부작위로 권리나 이익을 침해받은 경우, 행정심판위원회에 그 처분의 취소·변경이나 필요한 처분을 구하는 권리구제 절차입니다.</p><small>아래는 일반적인 유형 설명이며 특정 사건의 유형은 처분과 개별 법령을 확인해 판단합니다.</small></div><div className="appeal-type-grid">{appealDetail.appealTypes.map(([title,body],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="appeal-heading"><p className="eyebrow">BEFORE / AFTER</p><h2>아직 처분 전인가요,<br/>이미 처분을 받으셨나요?</h2><p>처분 전에는 의견제출 기한을, 처분 후에는 송달일과 불복 방법을 먼저 확인합니다.</p></div><div className="appeal-stage-compare"><article><span>BEFORE</span><h3>처분 전 대응</h3><ul>{appealDetail.beforeResponse.map((item)=><li key={item}><Check/>{item}</li>)}</ul></article><article><span>AFTER</span><h3>처분 후 대응</h3><ul>{appealDetail.afterResponse.map((item)=><li key={item}><Check/>{item}</li>)}</ul><small>집행정지는 자동으로 적용되지 않으며 별도 신청과 요건 판단이 필요한 절차입니다.</small></article></div></div></section>

    <section className="appeal-scope"><div className="shell"><div className="appeal-heading light"><p className="eyebrow">SERVICE SCOPE</p><h2>행정심판·행정처분 주요 지원 업무</h2><p>행정사는 행정기관 제출 서류 작성, 작성 서류의 제출 대행과 행정 상담 등을 법령이 허용하는 범위에서 수행합니다. 행정심판 사건의 대리권을 일반적으로 보유한 것으로 표시하지 않으며, 대리·제출 가능 여부는 개별 법령과 위임 범위를 확인합니다.</p></div><div className="appeal-support-grid">{appealDetail.supports.map((item,index)=><article key={item.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3><ul>{item.items.map((value)=><li key={value}>{value}</li>)}</ul><small>{item.scope}</small></article>)}</div><div className="appeal-scope-note"><ShieldCheck/><p><strong>업무 범위 안내</strong> 김태훈 행정사의 실제 수행자료로 확인되는 범위는 처분서 검토, 사실관계 정리와 행정기관 제출 문서 작성 지원입니다. 행정소송 등 법원 절차나 변호사 고유 업무는 관련 법률전문가의 검토가 필요합니다.</p></div></div></section>

    <section className="section"><div className="shell appeal-prep"><div><p className="eyebrow">PREPARE</p><h2>상담 전, 다음 자료를 준비해 주세요.</h2><p>자료가 모두 준비되지 않았더라도 처분서와 받은 날짜를 우선 알려주시면 추가로 확인할 사항을 안내해 드립니다.</p><small><ShieldCheck/>주민등록번호·사업자번호 등 민감정보는 가린 뒤 보관해 주세요. 초기 상담폼에서는 파일을 받지 않습니다.</small></div><ul>{appealDetail.preparations.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span>{item}</li>)}</ul></div></section>

    <section className="section soft"><div className="shell"><div className="appeal-heading center"><p className="eyebrow">PROCESS</p><h2>행정처분 대응 진행 절차</h2><p>대상 절차와 실제 위임받은 업무 범위를 확인한 뒤 단계별로 진행합니다.</p></div><ol className="permit-process appeal-process">{appealDetail.process.map(([title,body],index)=><li key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>

    <section className="section"><div className="shell appeal-issues"><div><p className="eyebrow">REVIEW POINTS</p><h2>행정처분은 어떤 부분을 검토하나요?</h2><p>아래 항목은 일반적인 검토 관점이며 모든 사건에 동일한 판단 기준으로 적용되는 것은 아닙니다.</p></div><div>{appealDetail.issues.map((item,index)=><article key={item}><span>0{index+1}</span><p>{item}</p></article>)}</div></div></section>

    <section className="section appeal-procedure-section"><div className="shell"><div className="appeal-heading"><p className="eyebrow">CHOOSE THE PROCEDURE</p><h2>행정심판이 맞는 절차인지부터 확인해야 합니다.</h2><p>불복 절차는 처분의 종류와 개별 법령에 따라 달라지며 표만으로 확정할 수 없습니다.</p></div><div className="appeal-procedure-table" role="table" aria-label="행정처분 불복 절차 비교"><div role="row"><b role="columnheader">절차</b><b role="columnheader">성격·대상</b><b role="columnheader">우선 확인</b></div>{appealDetail.procedureComparison.map(([name,nature,check])=><div role="row" key={name}><strong role="cell">{name}</strong><span role="cell">{nature}</span><small role="cell">{check}</small></div>)}</div><p className="appeal-procedure-note"><Scale/>행정소송과 법원 제출·대리 등 변호사 고유 업무에 해당하는 경우에는 변호사 등 관련 법률전문가의 검토가 필요합니다.</p></div></section>

    <section className="section"><div className="shell appeal-caution"><CircleAlert/><div><p className="eyebrow">PLEASE NOTE</p><h2>행정처분 대응 전 확인해 주세요.</h2><ul>{appealDetail.cautions.map((item)=><li key={item}>{item}</li>)}</ul></div></div></section>

    <section className="section soft"><div className="shell appeal-official"><div><p className="eyebrow">OFFICIAL INFORMATION</p><h2>대상·관할·기간은 공식 자료로 다시 확인합니다.</h2><p>처분기관 홈페이지와 처분서의 불복 안내, 개별 법령을 사건별로 함께 확인해야 합니다.</p><small>공식 정보 최종 확인일: {appealDetail.lastReviewed}</small></div><div>{appealDetail.officialSources.map((source)=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ExternalLink/></a>)}</div></div></section>

    <section className="section"><div className="shell appeal-faq"><div><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>일반적인 기준을 먼저 설명하고 사건별 예외는 처분서와 개별 법령으로 확인합니다.</p></div><div className="faq-list">{appealDetail.faqs.map(([question,answer])=><details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>

    {(relatedExample||relatedPost)&&<section className="section appeal-related"><div className="shell"><div className="appeal-heading"><p className="eyebrow">RELATED CONTENT</p><h2>관련 진행 예시와 안내 글</h2><p>실제 수행사례가 아닌 일반적인 상황을 바탕으로 한 진행 예시입니다.</p></div><div className="appeal-related-grid">{relatedExample&&<article><small>업무 진행 예시</small><h3>{relatedExample.title}</h3><p>{relatedExample.summary}</p><Link href={`/cases/${relatedExample.slug}`}>진행 예시 보기 <ArrowRight/></Link></article>}{relatedPost&&<article><small>발행된 블로그</small><h3>{relatedPost.title}</h3><p>{relatedPost.summary}</p><Link href={`/blog/${relatedPost.slug}`}>안내 글 보기 <ArrowRight/></Link></article>}</div></div></section>}

    <section className="appeal-final"><div className="shell"><HelpCircle/><div><p className="eyebrow">CONSULTATION</p><h2>처분서와 받은 날짜를 확인한 뒤,<br/><strong>가능한 대응 절차부터 검토하세요.</strong></h2><p>처분서 또는 사전통지서와 현재 상황을 알려주시면 상담 가능한 업무와 우선 확인할 사항을 안내해 드립니다.</p></div><div className="button-row"><Link className="button gold" href="/contact?service=appeal">행정처분 상담하기</Link><Link className="button outline-light" href="/services">전체 업무 분야 보기</Link></div></div></section>
  </>;
}
