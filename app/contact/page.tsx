import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertTriangle, Check, ClipboardList, FileCheck2, MessageSquareText, SearchCheck } from "lucide-react";
import ContactApplicationForm from "@/components/ContactApplicationForm";
import { Breadcrumbs } from "@/components/Common";
import { breadcrumbJsonLd, jsonLd, publicMetadata } from "@/lib/site";

const title = "상담 신청 | 김태훈 행정사";
const description = "출입국·비자, 인허가, 행정심판, 기업행정, 부동산 행정, 내용증명 및 행정서류 관련 상담을 신청할 수 있습니다.";
export const metadata: Metadata = publicMetadata({ title, description, path: "/contact", index: false });

const consultationProcess = [
  [ClipboardList, "상담 신청 작성"], [SearchCheck, "접수 내용 확인"],
  [MessageSquareText, "상담 및 필요자료 안내"], [FileCheck2, "업무 진행 여부 결정"],
] as const;

export default function ContactPage() {
  const contactEnabled = Boolean(process.env.CONTACT_FORM_ENDPOINT);
  const breadcrumb = breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "상담 신청", path: "/contact" }]);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }}/>
    <section className="contact-hero"><div className="shell contact-hero-inner">
      <div><p className="eyebrow">CONSULTATION</p><h1>복잡한 행정 문제,<br/><strong>현재 상황부터 말씀해주세요</strong></h1><p>상담 내용을 확인한 후 필요한 자료와 진행 방향을 안내해드립니다.</p></div>
      <ul>{["대표 행정사 직접 확인", "업무 분야별 상담 안내", "필요한 자료와 절차 안내"].map(item => <li key={item}><Check/>{item}</li>)}</ul>
    </div></section>
    <Breadcrumbs items={[{ label: "상담 신청" }]}/>
    <section className="contact-process-section"><div className="shell">
      <div className="contact-process-heading"><p className="eyebrow">HOW IT WORKS</p><h2>상담은 이렇게 진행됩니다</h2></div>
      <ol className="contact-process">{consultationProcess.map(([Icon, label], index) => <li key={label}><span>{String(index + 1).padStart(2, "0")}</span><Icon/><strong>{label}</strong></li>)}</ol>
      <p className="contact-process-notice"><AlertTriangle/>문의 접수는 업무 수임을 의미하지 않으며, 상담 내용과 업무 범위를 확인한 후 진행 여부가 결정됩니다.</p>
    </div></section>
    <section className="section contact-main"><div className="shell contact-layout">
      {contactEnabled ? <Suspense fallback={<div className="contact-form-loading">상담 신청서를 불러오는 중입니다.</div>}><ContactApplicationForm/></Suspense> : <div className="contact-unavailable" role="status"><AlertTriangle/><p className="eyebrow">ONLINE RECEPTION</p><h2>온라인 상담 접수 준비 중입니다.</h2><p>현재 안전한 접수 채널을 점검하고 있습니다. 연결이 완료되기 전에는 이름, 연락처, 문의 내용을 입력받거나 저장하지 않습니다.</p><Link className="button outline" href="/services">업무 분야 먼저 확인하기</Link></div>}
      <aside className="contact-guide"><div><p className="eyebrow">CONSULTATION GUIDE</p><h2>상담 전에 확인해주세요</h2><ul>{[
        "현재 상황을 시간순으로 정리하면 상담에 도움이 됩니다.",
        "이미 받은 통지서나 제출한 서류가 있다면 상담 시 말씀해주세요.",
        "처리기한이 있는 업무는 기한을 반드시 작성해주세요.",
        "민감한 개인정보와 원본서류는 상담 신청 폼에 첨부하지 마세요.",
      ].map(item => <li key={item}><Check/>{item}</li>)}</ul></div>
      <div className="contact-deadline"><AlertTriangle/><h3>긴급 기한 안내</h3><p>불복기간, 신청기한 또는 제출기한이 임박한 경우 문의 내용에 정확한 날짜를 작성해주세요. 온라인 접수만으로 기한 준수가 보장되지는 않습니다.</p></div>
      <p className="contact-after-note">접수 후 내용을 검토하여 상담 가능 여부와 필요한 자료를 안내합니다. 접수만으로 수임 관계가 성립하지 않습니다.</p>
      </aside>
    </div></section>
  </>;
}
