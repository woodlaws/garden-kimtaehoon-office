import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, FileCheck2, Handshake, MessageCircleQuestion, MonitorPlay, SearchCheck, ShieldCheck, UserRoundCheck } from "lucide-react";
import { CTA } from "@/components/Common";
import { ConsultationForm } from "@/components/ConsultationForm";
import { blogPosts, caseExamples, faqs, notices, processSteps, services, siteConfig } from "@/data/site";

const icons = [FileCheck2, BriefcaseBusiness, SearchCheck, ShieldCheck, Handshake, BadgeCheck];

export default function Home() {
  return <>
    <section className="hero hero-redesign"><div className="shell hero-shell hero-grid">
      <div className="hero-copy"><p className="eyebrow">의뢰인의 가장 든든한 행정 파트너</p><h1 className="hero-title"><span>복잡한 행정 절차,</span><span className="hero-title-accent">김태훈 행정사가</span><span>명확하게 풀어드립니다.</span></h1><p className="hero-lead">인허가부터 기업행정·행정심판·출입국 업무까지,<br/>자료를 꼼꼼히 확인하고 진행 과정을 책임 있게 안내합니다.</p><div className="button-row"><Link href="/consultation" className="button primary">상담 신청하기 <ArrowRight/></Link><Link href="/services" className="button outline">업무 분야 확인하기</Link></div></div>
      <figure className="hero-portrait" aria-label="김태훈 행정사 프로필 이미지"><div className="hero-portrait-frame"><img src="/images/mockup-source.png" alt="목업에 제공된 김태훈 행정사 프로필"/></div><figcaption className="hero-profile-caption"><div><small>대표 행정사</small><strong>김태훈</strong></div><ul><li>직접 상담·업무 수행</li><li>진행 단계별 안내</li></ul></figcaption></figure>
    </div></section>
    <section className="trust-strip"><div className="shell trust-grid"><div><UserRoundCheck/><b>직접 상담·직접 수행</b><span>대표 행정사가 책임 있게 진행</span></div><div><BriefcaseBusiness/><b>다양한 행정업무</b><span>상황에 맞는 절차와 서류 안내</span></div><div><MessageCircleQuestion/><b>이해하기 쉬운 설명</b><span>복잡한 내용을 단계별로 안내</span></div><div><MonitorPlay/><b>행정 정보 콘텐츠</b><span>실무 중심 정보 꾸준히 제공</span></div></div></section>

    <section className="section intro-section"><div className="shell intro-grid"><div><p className="eyebrow">ABOUT</p><h2>의뢰인의 상황부터<br/>정확히 듣습니다.</h2><p className="lead">행정절차는 같은 이름의 업무라도 사실관계와 관할에 따라 준비할 내용이 달라집니다.</p><p>가든 행정사사무소는 먼저 자료와 현재 상황을 확인하고, 가능한 절차와 필요한 서류를 이해하기 쉽게 설명하는 것을 원칙으로 합니다.</p><Link className="text-link" href="/about">행정사 소개 보기 →</Link></div><div className="profile-card"><div className="profile-photo"><div className="mockup-crop small"><img src="/images/mockup-source.png" alt="김태훈 행정사 프로필"/></div></div><div><span>대표 행정사</span><h3>김태훈</h3><ul><li>자격·등록 정보 확인 후 게시</li><li>주요 경력 확인 후 게시</li><li>전문 분야는 상담 범위에 맞춰 안내</li></ul><p className="signature">정확한 안내와 책임 있는 진행을 약속합니다.</p></div></div></div></section>

    <section className="section soft"><div className="shell"><div className="section-heading center"><p className="eyebrow">SERVICES</p><h2>주요 업무 안내</h2><p>내 상황에 가까운 업무를 선택하면 준비사항과 진행 절차를 확인할 수 있습니다.</p></div><div className="service-grid">{services.map((service, i) => { const Icon = icons[i]; return <article className="service-card" key={service.slug}><Icon/><h3>{service.title}</h3><p>{service.short}</p><Link href={`/services/${service.slug}`}>자세히 보기 <ArrowRight/></Link></article>; })}</div><div className="center-action"><Link className="button outline" href="/services">전체 업무 분야 보기</Link></div></div></section>

    <section className="reason-section"><div className="shell"><div className="section-heading center light"><p className="eyebrow">WHY US</p><h2>김태훈 행정사와 함께하는 이유</h2></div><div className="reason-grid"><div><UserRoundCheck/><h3>대표 행정사 직접 수행</h3><p>상담부터 서류 검토와 진행 안내까지 직접 책임집니다.</p></div><div><FileCheck2/><h3>절차별 명확한 안내</h3><p>업무 진행 단계와 필요한 서류를 알기 쉽게 설명합니다.</p></div><div><SearchCheck/><h3>자료 중심의 꼼꼼한 검토</h3><p>추측보다 처분서와 신청자료, 사실관계를 먼저 확인합니다.</p></div><div><ShieldCheck/><h3>진행 상황 공유</h3><p>현재 단계와 추가로 필요한 내용을 투명하게 안내합니다.</p></div></div></div></section>

    <section className="section"><div className="shell"><div className="section-heading center"><p className="eyebrow">PROCESS</p><h2>업무 진행 절차</h2></div><ol className="process-grid">{processSteps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2,"0")}</span><b>{step}</b><p>{i === 0 ? "현재 상황과 필요한 업무를 알려주세요." : i === 1 ? "관련 자료와 사실관계를 확인합니다." : i === 2 ? "범위와 일정, 준비사항을 안내합니다." : i === 3 ? "동의한 범위에서 업무를 시작합니다." : i === 4 ? "중요 단계와 보완사항을 공유합니다." : "처리 내용과 후속 절차를 안내합니다."}</p></li>)}</ol></div></section>

    <section className="section soft"><div className="shell"><div className="split-heading"><div><p className="eyebrow">WORK EXAMPLES</p><h2>업무 진행 예시</h2></div><Link className="text-link" href="/cases">전체 보기 →</Link></div><div className="case-grid">{caseExamples.map(c => <article className="case-card" key={c.slug}><span>{c.status}</span><small>{c.category}</small><h3><Link href={`/cases/${c.slug}`}>{c.title}</Link></h3><p>{c.issue}</p><Link href={`/cases/${c.slug}`}>진행 방식 보기 →</Link></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="split-heading"><div><p className="eyebrow">ADMINISTRATIVE INSIGHTS</p><h2>행정사가 직접 알려드리는 실무 정보</h2></div><Link className="text-link" href="/blog">블로그 전체 보기 →</Link></div><div className="blog-grid home-blog">{blogPosts.slice(0,3).map((post,i)=><article className="blog-card" key={post.slug}><div className={`thumb thumb-${i+1}`}><span>{post.category}</span></div><div className="card-body"><p className="meta">{post.date}</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.summary}</p></div></article>)}</div></div></section>

    <section className="section soft"><div className="shell info-grid"><div><div className="split-heading"><div><p className="eyebrow">NOTICE</p><h2>공지사항</h2></div><Link href="/board/notices">전체 보기 →</Link></div><div className="notice-list">{notices.map(n=><Link href={`/board/notices#${n.id}`} key={n.id}><span>{n.pinned ? "중요" : "안내"}</span><b>{n.title}</b><time>{n.date}</time></Link>)}</div></div><div><p className="eyebrow">QUICK LINKS</p><h2>필요한 정보를 바로 확인하세요</h2><div className="quick-grid"><Link href="/board/resources">자료실 <ArrowRight/></Link><Link href="/board/faq">자주 묻는 질문 <ArrowRight/></Link><Link href="/board/inquiry">상담 문의 게시판 <ArrowRight/></Link><Link href="/consultation">온라인 상담 신청 <ArrowRight/></Link></div></div></div></section>

    <section className="section"><div className="shell faq-wrap"><div><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2><p>상담 전에 많이 궁금해하는 내용을 모았습니다.</p><Link className="button outline" href="/board/faq">전체 질문 보기</Link></div><div className="faq-list">{faqs.slice(0,6).map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></div></section>

    <section className="consult-band"><div className="shell consult-grid"><div><p className="eyebrow">ONLINE CONSULTATION</p><h2>어떤 행정 절차로<br/><strong>고민하고 계신가요?</strong></h2><p>간단한 정보를 남겨주시면 연결 준비가 완료된 뒤 상담 절차를 안내할 수 있습니다.</p><small>현재 저장 기능은 준비 중이며, 제출 시 연결 상태를 명확히 안내합니다.</small></div><ConsultationForm compact/></div></section>

    <section className="section location" id="location"><div className="shell"><div className="section-heading center"><p className="eyebrow">LOCATION</p><h2>오시는 길</h2></div><div className="location-card"><div><h3>{siteConfig.name}</h3><p><b>주소</b> {siteConfig.address}</p><p><b>전화</b> {siteConfig.phone}</p><p><b>운영시간</b> {siteConfig.hours}</p><p className="data-note">정확한 주소와 교통·주차 정보는 고객 확인 후 게시됩니다.</p></div><div className="map-placeholder"><span>지도 연결 준비 중</span><p>주소 확정 후 지도와 길찾기 버튼이 활성화됩니다.</p></div></div></div></section>
    <CTA/>
  </>;
}
