import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  FileCheck2,
  HeartHandshake,
  Phone,
  Scale,
  Sprout,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { coreServices, serviceProcess, type CoreService } from "@/data/core-services";

const icons = { building: Building2, sprout: Sprout, heart: HeartHandshake, scale: Scale } as const;

export function CoreServiceDetail({ service }: { service: CoreService }) {
  const Icon = icons[service.icon];
  const related = coreServices.filter((item) => item.slug !== service.slug);

  return <>
    <section className={`core-service-hero core-service-${service.icon}`}>
      <div className="shell core-service-hero-grid">
        <div className="core-service-hero-copy">
          <p className="core-service-label"><span>4대 핵심 업무</span>{service.title}</p>
          <h1>{service.heroTitle}</h1>
          <p>{service.intro}</p>
          <div className="button-row">
            <Link className="button gold" href={`/contact?service=${service.consultationQuery}`}>상담 요청하기 <ArrowRight/></Link>
            <a className="button outline-light" href="tel:01058345300"><Phone/> 전화 상담</a>
          </div>
          <div className="core-service-contact"><span>평일 09:00~19:00</span><a href="tel:01058345300">010-5834-5300</a></div>
        </div>
        <div className="core-service-visual" aria-hidden="true">
          <div className="core-service-icon"><Icon/></div>
          <span>상황 확인</span><ChevronRight/><span>절차 검토</span><ChevronRight/><span>업무 안내</span>
        </div>
      </div>
    </section>
    <Breadcrumbs items={[{ label: "업무 분야", href: "/services" }, { label: service.title }]}/>

    <section className="section core-service-audience"><div className="shell core-service-two-column">
      <div className="core-service-heading"><p className="eyebrow">WHO WE HELP</p><h2>이런 분에게 필요합니다</h2><p>현재 상황과 가까운 항목이 있다면 상담을 통해 적용되는 절차를 확인해 보세요.</p></div>
      <ul className="core-service-checks">{service.audiences.map((item) => <li key={item}><Check/>{item}</li>)}</ul>
    </div></section>

    <section className="section soft core-service-support"><div className="shell">
      <div className="section-heading center"><p className="eyebrow">SERVICE SCOPE</p><h2>주요 지원 업무</h2><p>사업과 자료의 현재 상태를 먼저 살펴보고 필요한 업무 범위를 안내합니다.</p></div>
      <div className="core-service-support-grid">{service.supports.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><FileCheck2/><h3>{item}</h3><p>상담을 통해 상황별 필요 절차를 안내합니다.</p></article>)}</div>
      <p className="core-service-disclaimer">업무의 적용 여부와 준비사항은 신청인의 상황, 관할기관 및 관련 기준에 따라 달라질 수 있으므로 상담을 통해 확인하시기 바랍니다.</p>
    </div></section>

    <section className="section core-service-process"><div className="shell">
      <div className="core-service-heading"><p className="eyebrow">CONSULTATION PROCESS</p><h2>상담과 업무는 이렇게 진행합니다</h2><p>비용과 기간은 자료와 업무 범위를 확인한 뒤 안내합니다.</p></div>
      <ol>{serviceProcess.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </div></section>

    <section className="section core-service-cases"><div className="shell">
      <div className="split-heading"><div><p className="eyebrow">ACTUAL WORK CASES</p><h2>관련 업무사례</h2></div><p>사례의 결과는 개별 사실관계에 따른 것이며 다른 업무의 결과를 보장하지 않습니다.</p></div>
      <div className={`core-service-case-grid count-${service.cases.length}`}>{service.cases.map((item) => <article key={item.path}><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p><Link href={item.path}>사례 상세 보기 <ArrowRight/></Link></article>)}</div>
      {service.evidence && <div className="core-service-evidence"><div><ClipboardCheck/><span><b>현장을 이해하는 전문성</b>교육과 기고를 통해 농업 행정 정보를 전달합니다.</span></div><nav aria-label="농업경영 전문 콘텐츠">{service.evidence.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.label}<ExternalLink/></a>)}</nav></div>}
    </div></section>

    <section className="section soft core-service-faq"><div className="shell core-service-two-column">
      <div className="core-service-heading"><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>일반적인 안내이며, 구체적인 적용 여부는 실제 자료와 상황을 확인한 뒤 판단합니다.</p></div>
      <div className="faq-list">{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className="section core-related-services"><div className="shell">
      <div className="split-heading"><div><p className="eyebrow">OTHER SERVICES</p><h2>다른 핵심 업무도 확인하세요</h2></div><Link href="/services">4대 핵심 업무 전체 보기 →</Link></div>
      <div className="core-related-grid">{related.map((item) => { const RelatedIcon = icons[item.icon]; return <Link key={item.slug} href={item.detailPath}><RelatedIcon/><div><h3>{item.title}</h3><p>{item.short}</p></div><ArrowRight/></Link>; })}</div>
    </div></section>

    <section className={`core-service-cta core-service-${service.icon}`}><div className="shell core-service-cta-grid">
      <div><p className="eyebrow">CONSULTATION</p><h2>현재 상황부터 차분하게 확인해 보겠습니다.</h2><p>같은 업무처럼 보여도 신청인의 상황과 관할기관에 따라 필요한 절차가 달라질 수 있습니다. 현재 준비된 자료와 궁금한 사항을 알려주시면 상담을 통해 확인해 드립니다.</p></div>
      <div><a className="button gold" href="tel:01058345300"><Phone/> 010-5834-5300 전화 상담</a><Link className="button outline-light" href={`/contact?service=${service.consultationQuery}`}>상담 내용 남기기</Link><small>평일 09:00~19:00 상담</small></div>
    </div></section>
  </>;
}
