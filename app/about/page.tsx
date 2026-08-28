import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Common";
import { blogPosts, services, siteConfig } from "@/data/site";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = publicMetadata({
  title: "김태훈 행정사 소개 | 가든 행정사사무소",
  description: "가든 행정사사무소 김태훈 행정사의 주요 경력, 전문 업무, 상담 원칙과 업무 진행 방식을 안내합니다.",
  path: "/about",
});

const trustPrinciples = [
  ["충분히 듣고 정확하게 진단합니다", "의뢰인의 상황과 목적을 먼저 확인하고 필요한 행정절차를 검토합니다."],
  ["어려운 내용을 이해하기 쉽게 설명합니다", "전문용어만 나열하지 않고 진행 단계와 준비사항을 눈높이에 맞춰 안내합니다."],
  ["상담부터 업무 수행까지 직접 책임집니다", "상담 내용이 실제 업무 과정에 정확하게 반영될 수 있도록 직접 확인하고 진행합니다."],
  ["진행 상황을 단계별로 안내합니다", "현재 진행 단계와 추가로 필요한 사항을 의뢰인이 알 수 있도록 안내합니다."],
] as const;

const processDescriptions = [
  "문의 내용과 상담 목적을 접수합니다.", "현재 상황과 관련 자료를 차분히 확인합니다.", "필요한 절차와 준비서류, 업무 범위를 안내합니다.",
  "동의한 범위와 일정에 따라 업무를 시작합니다.", "현재 단계와 추가 확인사항을 공유합니다.", "처리 결과와 필요한 후속 절차를 안내합니다.",
] as const;

const aboutProcessSteps = ["상담 접수", "현재 상황 및 자료 확인", "필요한 절차와 준비서류 안내", "계약 및 업무 착수", "진행 상황 공유", "결과 안내 및 사후 확인"] as const;

export default function AboutPage() {
  const structuredData = { "@graph": [
    breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "행정사 소개", path: "/about" }]),
    { "@type": "Person", "@id": `${siteUrl("/about")}#kim-taehoon`, name: "김태훈", jobTitle: "행정사", url: siteUrl("/about"), image: siteUrl("/images/profile-about.webp"), worksFor: { "@type": "ProfessionalService", "@id": `${siteUrl("/")}#office`, name: siteConfig.name, url: siteUrl("/") }, knowsAbout: services.map((service) => service.title) },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
    <section className="about-hero"><div className="shell about-hero-grid">
      <div className="about-hero-copy"><p className="eyebrow">ABOUT ADMINISTRATIVE ATTORNEY</p><h1><span>사람을 향한 행정,</span><strong>정확함과 책임으로</strong><strong>답합니다.</strong></h1><p>복잡한 행정절차를 의뢰인의 눈높이에서 설명하고,<br/>필요한 서류와 진행 과정을 꼼꼼하게 안내합니다.</p><nav className="about-anchor-nav" aria-label="행정사 소개 페이지 바로가기"><a href="#greeting">인사말</a><a href="#profile">프로필</a><a href="#principles">업무 원칙</a><a href="#expertise">전문 업무</a></nav></div>
      <div className="about-hero-visual"><div className="about-hero-photo"><Image src="/images/profile-about.webp" alt="가든 행정사사무소 대표 행정사 김태훈" fill sizes="(max-width: 780px) calc(100vw - 32px), 480px"/></div><ul className="about-trust-tags" aria-label="김태훈 행정사의 업무 방식"><li>직접 상담</li><li>직접 업무 수행</li><li>단계별 진행 안내</li><li>실무 중심 행정 정보</li></ul></div>
    </div></section>
    <Breadcrumbs items={[{ label: "행정사 소개" }]}/>

    <section className="section about-greeting" id="greeting"><div className="shell about-greeting-grid">
      <div className="about-quote-block"><p className="eyebrow">MESSAGE</p><blockquote>복잡한 행정의 순간,<br/><strong>의뢰인 곁에서 답을 찾겠습니다.</strong></blockquote><p>현재 상황을 정확하게 이해하는 것에서 올바른 절차가 시작됩니다.</p></div>
      <div className="about-message"><p>행정업무는 같은 제도와 절차를 다루더라도 의뢰인의 상황에 따라 준비해야 할 자료와 대응 방향이 달라질 수 있습니다.</p><p>처음 접하는 행정절차 앞에서 어디서부터 시작해야 할지 막막함을 느끼는 분들이 많습니다. 저는 의뢰인의 이야기를 충분히 듣고 현재 상황을 정확하게 파악한 뒤, 필요한 절차와 준비사항을 이해하기 쉽게 설명드리는 것을 중요하게 생각합니다.</p><p>상담에서 끝나는 것이 아니라 서류 검토와 작성, 접수와 진행 상황 안내까지 책임감을 가지고 함께하겠습니다. 복잡한 행정절차로 고민하고 계신다면 혼자 판단하기보다 먼저 현재 상황을 점검해 보시기 바랍니다.</p><div className="about-signature"><span>가든 행정사사무소</span><strong>대표 행정사 김태훈</strong></div></div>
    </div></section>

    <section className="section about-profile-section" id="profile"><div className="shell"><div className="about-section-heading"><p className="eyebrow">PROFILE</p><h2>김태훈 행정사를 소개합니다</h2><p>확인된 업무 범위와 상담·수행 원칙을 중심으로 안내합니다.</p></div><div className="about-profile-layout"><aside className="about-profile-name"><span>대표 행정사</span><h3>김태훈</h3><p>{siteConfig.name}</p><div className="about-profile-line"/></aside><dl className="about-profile-list"><div><dt>성명·직함</dt><dd>김태훈 대표 행정사</dd></div><div><dt>소속 사무소</dt><dd>가든 행정사사무소</dd></div><div><dt>전문 업무 분야</dt><dd>{services.map((service) => service.title).join(" · ")}</dd></div><div><dt>상담 및 수행 방식</dt><dd>상황과 자료를 먼저 확인하고, 상담부터 업무 수행과 진행 안내까지 직접 책임집니다.</dd></div><div><dt>행정정보 활동</dt><dd>홈페이지 블로그와 자주 묻는 질문을 통해 실무 중심 행정정보를 제공합니다.</dd></div></dl></div></div></section>

    <section className="section about-principles-section" id="principles"><div className="shell"><div className="about-section-heading light"><p className="eyebrow">WORK PRINCIPLES</p><h2>의뢰인이 안심할 수 있는 업무 원칙</h2></div><ol className="about-principles">{trustPrinciples.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></section>

    <section className="section" id="expertise"><div className="shell"><div className="about-section-heading split"><div><p className="eyebrow">EXPERTISE</p><h2>행정의 여러 분야에서<br/>상황에 맞는 절차를 안내합니다.</h2></div><Link className="text-link" href="/services">전체 업무 분야 보기 <ArrowRight/></Link></div><div className="about-service-grid">{services.map((service, index) => <article key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.short}</p><Link href={service.detailPath}>자세히 보기 <ArrowRight/></Link></article>)}</div></div></section>

    <section className="section soft about-process-section"><div className="shell"><div className="about-section-heading"><p className="eyebrow">PROCESS</p><h2>상담부터 결과 안내까지<br/>진행 과정을 함께합니다.</h2></div><ol className="about-process">{aboutProcessSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{processDescriptions[index]}</p></li>)}</ol></div></section>

    <section className="section about-content-section"><div className="shell"><div className="about-content-intro"><p className="eyebrow">ADMINISTRATIVE INSIGHTS</p><h2>어려운 행정정보를<br/>더 쉽게 전하겠습니다.</h2><p>자주 묻는 질문과 실무 체크리스트, 제도와 절차를 이해하는 데 도움이 되는 정보를 꾸준히 정리합니다.</p><div className="button-row"><Link className="button primary" href="/blog">행정 정보 블로그 보기</Link><Link className="button outline" href="/board/faq">자주 묻는 질문 보기</Link></div></div><div className="about-latest-posts">{blogPosts.slice(0, 3).map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.summary}</p><small>{post.date} <ArrowRight/></small></Link>)}</div></div></section>

    <section className="about-final-cta"><div className="shell about-final-cta-inner"><div><p className="eyebrow">CONSULTATION</p><h2>어떤 절차가 필요한지 막막하다면,<br/><strong>현재 상황부터 함께 확인하겠습니다.</strong></h2><p>문의 내용을 남겨주시면 확인 후 상담 가능한 업무와 준비사항을 안내해 드립니다.</p></div><div className="about-final-actions"><Link className="button gold" href="/contact">온라인 상담 신청</Link><Link className="button outline-light" href="/services">업무 분야 확인</Link>{siteConfig.phoneHref ? <a className="button outline-light" href={siteConfig.phoneHref}><Phone/> 전화 상담</a> : <span className="button outline-light disabled" aria-disabled="true"><Phone/> 전화 상담</span>}<Link className="about-location-link" href="/#location">오시는 길 안내 →</Link></div></div></section>
  </>;
}
