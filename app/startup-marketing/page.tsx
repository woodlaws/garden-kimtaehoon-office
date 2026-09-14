import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText, Check, FileSearch, Globe2, HelpCircle, PackageCheck, Phone, ShoppingBag, Sprout, Store } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { commonWebsiteItems, startupAudiences, startupFaqs, startupProcess, startupServices, websitePackages } from "@/data/startup-marketing";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

const title = "창업마케팅 | 청년 농업인 홈페이지·블로그·스마트스토어 상담";
const description = "청년 농업인과 창업자를 위한 블로그·홈페이지·스마트스토어 제작 상담과 홈페이지 상품별 제작비를 안내합니다.";

export const metadata: Metadata = publicMetadata({ title, description, path: "/startup-marketing" });

const serviceIcons = [BookOpenText, Globe2, Store] as const;

export default function StartupMarketingPage() {
  const breadcrumb = breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "창업마케팅", path: "/startup-marketing" }]);
  const faqSchema = { "@type": "FAQPage", mainEntity: startupFaqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  const serviceSchema = { "@type": "Service", name: "창업마케팅 상담", provider: { "@type": "ProfessionalService", name: siteConfig.name, url: siteUrl("/") }, areaServed: "대한민국", description };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}/>

    <section className="startup-hero">
      <div className="shell startup-hero-grid">
        <div className="startup-hero-copy">
          <p className="eyebrow">청년 농업인과 창업자를 위한 창업마케팅</p>
          <h1>우리 농장과 상품을 알리는 첫걸음,<br/><strong>김태훈 행정사와 함께 준비하세요.</strong></h1>
          <p>농장·브랜드 소개부터 상품 안내와 고객 문의까지.<br/>블로그·홈페이지·스마트스토어 중<br/>사업 단계와 예산에 맞는 온라인 채널을 안내합니다.</p>
          <div className="button-row"><Link className="button gold" href="/contact?service=startup-marketing">창업마케팅 상담하기 <ArrowRight/></Link><a className="button outline-light" href="#website-pricing">홈페이지 제작비 보기</a></div>
        </div>
        <div className="startup-channel-map" aria-label="창업마케팅 온라인 채널 구성">
          <div className="startup-channel-center"><Sprout/><strong>우리 농장과 상품</strong><span>사업 단계·목표 확인</span></div>
          <div className="startup-channel-list"><span><BookOpenText/>블로그<small>이야기와 정보</small></span><span><Globe2/>홈페이지<small>소개와 문의</small></span><span><ShoppingBag/>스마트스토어<small>상품 판매</small></span></div>
        </div>
      </div>
    </section>
    <Breadcrumbs items={[{ label: "창업마케팅" }]}/>

    <section className="section startup-audience"><div className="shell startup-two-column">
      <div className="startup-heading"><p className="eyebrow">WHO WE HELP</p><h2>이런 상황이라면<br/>함께 방향을 잡아보세요</h2><p>청년 농업인을 중심으로 일반 창업자와 소상공인의 온라인 소개·판매 준비도 상담합니다.</p></div>
      <ul>{startupAudiences.map((item) => <li key={item}><Check/>{item}</li>)}</ul>
    </div></section>

    <section className="section soft startup-services"><div className="shell">
      <div className="section-heading center"><p className="eyebrow">THREE CHANNELS</p><h2>사업에 맞는 온라인 채널을 준비합니다</h2><p>서비스 소개와 실제 계약에 포함되는 작업량은 구분하며, 구체적인 범위는 상담과 견적에서 확인합니다.</p></div>
      <div className="startup-service-grid">{startupServices.map((service, index) => { const Icon = serviceIcons[index]; return <article key={service.key}><Icon/><p className="startup-service-number">0{index + 1}</p><h3>{service.title}</h3><p>{service.description}</p><ul>{service.items.map((item) => <li key={item}><Check/>{item}</li>)}</ul><div className="startup-service-price"><span>제작비</span><strong>{service.price}</strong></div>{service.key === "website" && <a className="text-link" href="#website-pricing">홈페이지 제작 상품 비교 <ArrowRight/></a>}</article>; })}</div>
    </div></section>

    <section className="section startup-pricing" id="website-pricing"><div className="shell">
      <div className="section-heading center"><p className="eyebrow">WEBSITE PACKAGES</p><h2>홈페이지 제작 상품</h2><p>농장·상품·사업 내용을 방문자가 이해하고 문의할 수 있는 깔끔한 소개형 홈페이지에 집중합니다.</p></div>
      <div className="startup-price-grid">{websitePackages.map((item, index) => <article className={index === 1 ? "recommended" : ""} key={item.key}>{index === 1 && <span className="startup-recommend">추천</span>}<p className="startup-package-label">{item.label}</p><h3>{item.name}</h3><p className="startup-package-price">{item.price}</p><div className="startup-package-target"><b>추천 대상</b><p>{item.target}</p></div><ul>{item.items.map((line) => <li key={line}><Check/>{line}</li>)}</ul>{"note" in item && <p className="startup-package-note">{item.note}</p>}<Link className={`button ${index === 1 ? "gold" : "outline"}`} href={`/contact?service=startup-marketing&package=${item.key}`}>{item.name} 상담하기 <ArrowRight/></Link></article>)}</div>
      <div className="startup-common"><div><PackageCheck/><span><b>모든 상품 공통 구성</b>실제 사업 자료와 확인된 상담 채널을 기준으로 제작합니다.</span></div><ul>{commonWebsiteItems.map((item) => <li key={item}><Check/>{item}</li>)}</ul></div>
      <p className="startup-price-notice">표시 금액은 기본 제작비 기준입니다. 최종 구성과 추가 기능, 부가세 및 도메인·호스팅·유지관리 비용은 상담과 견적서에서 안내합니다.</p>
      <aside className="startup-addons"><div><HelpCircle/><span><b>추가 기능은 별도로 상담합니다</b>소개형 홈페이지의 기본 제작 범위와 분리하여 필요한 기능만 확인합니다.</span></div><ul><li>회원가입</li><li>자체 결제</li><li>실시간 예약</li><li>관리자 게시판</li></ul><p>스마트스토어 링크 연결과 홈페이지 안에서 작동하는 자체 쇼핑몰 결제 기능은 서로 다른 작업입니다.</p></aside>
    </div></section>

    <section className="section soft startup-support"><div className="shell startup-support-grid">
      <figure><Image src="/images/activities/4h/support-search.webp" alt="김태훈 행정사가 농업 지원사업 확인 방법을 설명하는 교육 현장" fill sizes="(max-width: 780px) calc(100vw - 32px), 520px"/><figcaption>농업 지원사업 확인 방법을 안내하는 교육 현장</figcaption></figure>
      <div><p className="eyebrow">SUPPORT PROGRAM</p><h2>지원사업을 준비하고 계신가요?</h2><p className="lead">검토 중인 사업 공고가 있다면 함께 알려주세요. 공고 내용과 필요한 제작물을 확인하여 홈페이지·블로그·스마트스토어의 제작 범위와 견적을 상담합니다.</p><p>지원 가능 여부와 선정, 지원금 지급 및 비용 정산 조건은 공고와 담당기관의 판단에 따라 달라집니다.</p><div className="button-row"><Link className="button primary" href="/contact?service=startup-marketing">공고와 함께 상담하기 <ArrowRight/></Link><Link className="button outline" href="/services/agriculture-consulting">농업경영 상담 보기</Link></div></div>
    </div></section>

    <section className="section startup-process"><div className="shell"><div className="section-heading center"><p className="eyebrow">PROCESS</p><h2>상담부터 공개까지</h2></div><ol>{startupProcess.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b></li>)}</ol><div className="startup-materials"><FileSearch/><div><h3>준비된 자료부터 알려주세요</h3><p>농장·사업 소개, 상품 정보, 로고, 실제 사진, 연락처, 참고 홈페이지가 있으면 상담에 도움이 됩니다. 모든 자료가 완비되지 않아도 현재 준비 상황부터 함께 정리할 수 있습니다.</p></div></div></div></section>

    <section className="section soft startup-faq"><div className="shell startup-two-column"><div className="startup-heading"><p className="eyebrow">FAQ</p><h2>창업마케팅 상담 전<br/>자주 묻는 질문</h2><p>제작 범위와 운영 조건은 사업과 자료의 현재 상태를 확인한 뒤 안내합니다.</p></div><div className="faq-list">{startupFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="startup-consult"><div className="shell startup-consult-grid"><div><p className="eyebrow">CONSULTATION</p><h2>창업 준비와 온라인 채널,<br/>지금 상황부터 말씀해 주세요.</h2><p>김태훈 행정사가 사업의 목표와 준비 단계를 확인하고 상담 가능한 범위를 안내합니다.</p></div><div><Link className="button gold" href="/contact?service=startup-marketing">창업마케팅 상담하기 <ArrowRight/></Link><a className="button outline-light" href={siteConfig.phoneHref}><Phone/> {siteConfig.phone}</a><small>{siteConfig.hours}</small></div></div></section>
  </>;
}
