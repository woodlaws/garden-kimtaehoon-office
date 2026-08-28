import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  ExternalLink,
  Files,
  HelpCircle,
  MailCheck,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { siteUrl } from "@/lib/site";

const canonical = siteUrl("/services/documents");
const consultation = "/contact?service=documents";

const quickChecks = [
  ["상대방에게 의사나 요구사항을 공식적인 문서로 전달해야 하나요?", "내용증명 작성 및 발송 안내"],
  ["여러 자료와 경위를 정리하여 사실관계를 명확하게 설명해야 하나요?", "사실조사 및 사실관계 정리"],
  ["행정기관에 진정서·탄원서·의견서 등의 서류를 제출해야 하나요?", "행정기관 제출 서류 작성"],
  ["계약·거래·확인 사항을 목적에 맞는 문서로 정리해야 하나요?", "권리·의무 및 사실증명 관련 서류"],
] as const;

const services = [
  {
    title: "내용증명 작성 지원",
    intro: "전달 목적과 사실관계를 확인하여 수신인이 이해할 수 있는 문서로 정리합니다.",
    items: ["발송 목적 및 상대방과의 관계 확인", "전달할 사실과 요구사항 정리", "날짜·금액·계약내용 및 경위 확인", "수신인과 발신인 정보 확인", "우체국 내용증명 발송 절차 안내", "필요한 경우 배달증명 제도 안내"],
    note: "내용증명은 우체국이 문서의 내용과 발송 사실을 증명하는 제도입니다. 기재된 사실의 진실이나 법적 효력을 자동으로 확정하지 않습니다.",
  },
  {
    title: "사실조사 및 사실관계 정리",
    intro: "의뢰인이 제공한 자료와 적법하게 확인 가능한 자료를 중심으로 경위를 구조화합니다.",
    items: ["사건 또는 업무의 발생 경위 파악", "시간순 사실관계 정리", "관련 문서와 참고자료 분류", "관계인 및 확인 대상 정리", "제출 목적에 맞는 조사 결과 정리"],
    note: "불법적인 개인정보 수집, 사생활 침해, 위치 추적 또는 흥신소 업무는 제공하지 않습니다.",
  },
  {
    title: "행정기관 제출 서류 작성",
    intro: "제출 목적과 담당 기관을 확인한 뒤 행정사 업무 범위 안에서 필요한 서류를 준비합니다.",
    items: ["진정서·건의서·질의서·청원서", "이의신청 관련 서류", "의견서 및 소명자료", "각종 신청·신고 관련 서류"],
    note: "제출 가능 여부와 구체적인 업무 범위는 사건 내용과 관련 법령에 따라 달라질 수 있습니다.",
  },
  {
    title: "사실확인 및 증명 관련 서류",
    intro: "문서의 사용 목적과 제출기관, 뒷받침할 자료가 서로 맞도록 구성합니다.",
    items: ["사실확인서", "경위서·진술서", "확인서·사유서", "소명서", "각종 사실관계 설명자료"],
    note: "목적, 제출기관 및 증빙자료에 따라 문서 구성과 준비서류가 달라집니다.",
  },
  {
    title: "권리·의무 관련 문서 지원",
    intro: "권리·의무 또는 사실증명에 관한 문서의 작성 가능 범위를 먼저 확인합니다.",
    items: ["계약 또는 거래 경위 정리", "합의·확인 사항의 문서화", "의사표시 및 요구사항 정리", "계약 관련 참고자료 검토", "권리·의무 또는 사실증명에 관한 문서 작성 지원"],
    note: "소송대리, 법률자문, 등기, 세무 등 다른 법률이나 자격제도에 따라 제한되는 업무는 수행하지 않습니다.",
  },
  {
    title: "문서 제출 및 발송 절차 안내",
    intro: "단순 발송에 그치지 않고 문서의 목적과 수신처, 이후 확인사항을 함께 점검합니다.",
    items: ["제출기관 및 수신처 확인", "제출 방식과 준비물 확인", "내용증명 및 배달증명 이용 안내", "행정기관 제출 절차 안내", "접수 이후 확인사항 안내"],
    note: "작성 문서의 성격과 위임 범위에 따라 제출 대행 가능 여부를 개별적으로 확인합니다.",
  },
] as const;

const certifiedMailSteps = [
  ["발송 목적 확인", "어떤 사실을 알리려는지", "어떤 요구사항을 전달하려는지", "답변 또는 이행 요청 기한"],
  ["사실과 자료 정리", "계약일과 거래일", "금액과 지급내역", "약속 또는 협의 내용", "문자·이메일·계약서·영수증"],
  ["문서 구성", "발신인과 수신인 정보", "사실관계", "요구사항과 이행기한", "향후 대응방향"],
  ["발송 및 보관", "내용증명 발송", "필요 시 배달증명 이용", "발송 문서와 접수자료 보관", "회신 또는 이행 여부 확인"],
] as const;

const preparation = ["사건 또는 업무의 진행 경위를 날짜순으로 정리한 메모", "계약서·신청서·확인서 등 관련 문서", "입금내역·영수증·거래명세서", "문자·이메일·카카오톡 등 의사소통 자료", "상대방 또는 제출기관의 정보", "이미 발송하거나 제출한 문서", "받은 통지서·답변서 또는 보완 요청서", "상담을 통해 해결하고 싶은 구체적인 목표"] as const;

const process = ["상담 신청 및 기본 상황 확인", "목적·제출처·수신인 확인", "사실관계 및 관련 자료 검토", "문서 작성 및 내용 확인", "제출·발송 절차 안내 및 후속 확인"] as const;

const faqs = [
  ["내용증명을 보내면 바로 법적 효력이 발생하나요?", "내용증명은 발송한 문서의 내용과 발송 사실을 증명하는 수단입니다. 그 자체만으로 기재된 사실의 진실이나 권리관계, 법적 판단이 확정되지는 않습니다."],
  ["내용증명과 배달증명은 어떻게 다른가요?", "내용증명은 어떤 내용의 문서를 언제 발송했는지를 증명하는 제도이고, 배달증명은 등기우편물이 수취인에게 배달되었는지를 증명하는 서비스입니다. 목적에 따라 함께 이용할 수 있습니다."],
  ["상대방의 주소를 모르는 경우에도 진행할 수 있나요?", "내용증명 발송에는 정확한 수신인 정보가 필요합니다. 적법하게 확인할 수 있는 주소 자료가 있는지 먼저 살펴보고, 확인이 어렵다면 가능한 다른 전달 방법이나 관련 전문기관 확인이 필요할 수 있습니다."],
  ["어떤 자료를 준비해야 하나요?", "문서의 목적, 날짜순 경위, 계약서·영수증·대화자료와 이미 주고받은 문서를 준비하면 도움이 됩니다. 자료가 모두 없어도 현재 보유한 내용부터 확인할 수 있습니다."],
  ["작성한 문서를 행정기관에 대신 제출할 수 있나요?", "행정사가 법정 업무 범위에서 작성한 행정서류는 위임 범위와 해당 절차에 따라 제출 대행이 가능할 수 있습니다. 다른 법률로 제한된 업무인지와 기관별 제출 방식을 먼저 확인합니다."],
  ["사실확인서나 경위서도 작성 지원을 받을 수 있나요?", "가능한 업무 범위에 해당하면 목적과 제출처, 사실관계 및 증빙자료를 확인하여 작성을 지원합니다. 문서 성격이나 분쟁 단계에 따라 다른 전문가의 검토가 필요할 수 있습니다."],
  ["상담부터 작성까지 얼마나 걸리나요?", "문서 종류, 사실관계의 복잡성, 자료 준비 상태와 제출기한에 따라 달라집니다. 자료를 확인한 뒤 업무 범위와 예상 일정을 개별적으로 안내합니다."],
  ["변호사·법무사·세무사 업무가 필요한 경우에는 어떻게 하나요?", "소송·법률사건, 등기, 세무신고 등 다른 법률에서 특정 자격사의 업무로 정한 사항은 행정사가 수행하지 않습니다. 상담 중 해당 가능성을 확인하면 적절한 전문기관의 확인이 필요하다고 안내합니다."],
] as const;

const related = [
  ["업무 분야 전체 보기", "/services", "전체 행정업무 안내"],
  ["행정심판", "/services/appeal", "행정처분 대응 절차"],
  ["기업행정", "/services/corporate", "기업·법인 행정업무"],
  ["부동산 행정", "/services/land-property", "토지·부동산 관련 절차"],
  ["블로그", "/blog", "행정 실무 정보"],
] as const;

export function DocumentsDetail() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: "사실조사·내용증명·행정서류", serviceType: "사실관계 정리 및 행정서류 작성 지원", description: "사실관계 정리, 내용증명, 진정서, 사실확인서 및 각종 행정기관 제출 서류의 준비와 절차를 안내합니다.", provider: { "@type": "ProfessionalService", name: "가든 행정사사무소" }, url: canonical },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: "https://garden-kimtaehoon-office.vercel.app/" }, { "@type": "ListItem", position: 2, name: "업무 분야", item: "https://garden-kimtaehoon-office.vercel.app/services" }, { "@type": "ListItem", position: 3, name: "사실조사·내용증명·행정서류", item: canonical }] },
      { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <section className="documents-hero"><div className="shell documents-hero-grid">
      <div><p className="eyebrow">DOCUMENT &amp; FACT CHECK</p><h1>흩어진 사실과 자료를<br/><strong>목적에 맞는 문서로 정리합니다</strong></h1><p>사실관계 확인부터 내용증명, 진정서, 사실확인서 및 각종 행정서류 작성까지 의뢰 목적과 제출처를 검토하여 필요한 절차를 안내합니다.</p><div className="button-row"><Link className="button gold" href={consultation}>상담 신청하기 <ArrowRight/></Link><a className="button outline-light" href="#document-services">지원 업무 확인하기</a></div></div>
      <div className="documents-visual" aria-label="사실과 자료를 문서로 정리하는 과정"><div className="documents-paper"><span>DOCUMENT REVIEW</span><Files/><i/><i/><i/></div><div className="documents-check"><ClipboardCheck/><b>목적별 문서 구성</b></div><ul><li>사실관계 및 자료 확인</li><li>목적별 문서 구성</li><li>제출·발송 절차 안내</li></ul></div>
    </div></section>
    <Breadcrumbs items={[{ label: "업무 분야", href: "/services" }, { label: "사실조사·내용증명·행정서류" }]}/>

    <section className="section documents-quick"><div className="shell"><div className="documents-heading"><p className="eyebrow">QUICK CHECK</p><h2>지금 어떤 문서가 필요하신가요?</h2><p>현재 상황과 가장 가까운 항목을 선택하면 관련 상담 항목으로 이동합니다.</p></div><div className="documents-question-grid">{quickChecks.map(([question, label], index) => <Link href={consultation} className="documents-question-card" key={question}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><p>{label}</p><i>상담 항목 확인 <ArrowRight/></i></Link>)}</div></div></section>

    <section className="section soft" id="document-services"><div className="shell"><div className="documents-heading"><p className="eyebrow">SERVICE SCOPE</p><h2>사실조사·내용증명·행정서류 지원 업무</h2><p>의뢰인의 상황과 목적을 먼저 확인하고, 사실과 자료를 수신처와 사용 목적에 맞게 정리합니다.</p></div><div className="documents-service-list">{services.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{service.title}</h3><p>{service.intro}</p></div><ul>{service.items.map(item => <li key={item}><Check/>{item}</li>)}</ul><small>{service.note}</small></article>)}</div></div></section>

    <section className="documents-mail"><div className="shell"><div className="documents-heading light"><p className="eyebrow">CERTIFIED MAIL</p><h2>내용증명, 보내기 전에<br/>이것부터 확인해야 합니다</h2></div><ol>{certifiedMailSteps.map(([title, ...items], index) => <li key={title}><span>STEP {String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></li>)}</ol><p className="documents-mail-notice"><MailCheck/><span><strong>내용증명 제도 안내</strong>내용증명은 발송한 문서의 내용과 발송 사실을 증명하는 수단입니다. 그 자체로 문서에 기재된 사실의 진실이나 법적 판단이 확정되는 것은 아닙니다.</span></p></div></section>

    <section className="section"><div className="shell documents-prep"><div><p className="eyebrow">PREPARATION</p><h2>상담 전에 준비하면 좋은 자료</h2><p>자료가 모두 준비되지 않았더라도 상담할 수 있습니다. 현재 보유한 자료를 먼저 확인한 후 추가로 필요한 사항을 안내합니다.</p></div><ul>{preparation.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul></div></section>

    <section className="section soft"><div className="shell"><div className="documents-heading center"><p className="eyebrow">PROCESS</p><h2>문서 작성은 다음과 같이 진행됩니다</h2><p>업무 종류와 구체적인 상황에 따라 순서와 필요한 단계는 달라질 수 있습니다.</p></div><ol className="documents-process">{process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></div></section>

    <section className="section"><div className="shell documents-scope"><ShieldCheck/><div><p className="eyebrow">PROFESSIONAL SCOPE</p><h2>업무 범위를 확인한 후 안내해드립니다</h2><p>행정사는 관계 법령에 따라 행정기관 제출 서류, 권리·의무 또는 사실증명에 관한 서류 등의 작성과 관련 절차를 지원합니다. 다만 소송대리, 등기, 세무대리, 특허대리, 공증 등 다른 법률에서 특정 자격사의 업무로 제한한 사항은 수행할 수 없습니다. 상담 과정에서 해당 업무가 다른 전문가의 영역에 해당하는 경우 적절한 전문기관 확인이 필요함을 안내드립니다.</p><div className="documents-source-links"><a href="https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1031085017" target="_blank" rel="noreferrer">국가법령정보센터 · 행정사법 제2조 <ExternalLink/></a><a href="https://www.epost.go.kr/" target="_blank" rel="noreferrer">인터넷우체국 · 증명서비스 <ExternalLink/></a></div><small>공식 기준 확인일: 2026-08-26 · 실제 수행 가능 범위는 김태훈 행정사의 자격 종류와 업무신고 사항을 추가 확인해야 합니다.</small></div></div></section>

    <section className="section soft"><div className="shell documents-faq"><div><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>기간, 비용과 가능한 절차는 문서의 목적, 사실관계와 보유 자료에 따라 달라집니다.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="section documents-related"><div className="shell"><div className="documents-heading"><p className="eyebrow">RELATED SERVICES</p><h2>관련 업무와 안내</h2></div><div className="documents-related-grid">{related.map(([title, href, description]) => <Link href={href} key={href}><small>{description}</small><strong>{title}</strong><ArrowRight/></Link>)}</div></div></section>

    <section className="documents-final"><div className="shell"><HelpCircle/><div><p className="eyebrow">CONSULTATION</p><h2>어떤 문서부터 준비해야 할지 모르시겠다면<br/><strong>현재 상황부터 말씀해주세요</strong></h2><p>문서의 목적과 사실관계를 확인한 후 필요한 자료와 진행 방향을 안내합니다.</p><small>상담 내용과 자료는 업무 검토를 위한 범위에서 확인합니다.</small></div><Link className="button gold" href={consultation}>사실조사·행정서류 상담 신청 <Send/></Link></div></section>
  </>;
}
