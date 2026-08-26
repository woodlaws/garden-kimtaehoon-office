"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  CONTACT_RETENTION_PERIOD,
  contactServices,
  contactTimes,
  consultationMethods,
  serviceQueryMap,
  type ContactErrors,
  type ContactFormValues,
  validateContact,
} from "@/lib/contact";

type ApiResult = { success?: boolean; receiptId?: string; message?: string; fields?: ContactErrors };

const emptyValues: ContactFormValues = {
  service: "", name: "", organization: "", phone: "", email: "", title: "", content: "",
  method: "", contactTime: "", referenceUrl: "", additionalNotes: "", privacyConsent: false,
  website: "", submissionId: "", sourcePage: "", pageUrl: "",
};

export default function ContactApplicationForm() {
  const searchParams = useSearchParams();
  const initialService = serviceQueryMap[searchParams.get("service") || ""] || "";
  const [service, setService] = useState<string>(initialService);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string; receiptId?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const busyRef = useRef(false);
  const lastSubmission = useRef<{ signature: string; time: number } | null>(null);

  useEffect(() => { setService(initialService); }, [initialService]);

  function readValues(): ContactFormValues {
    const data = new FormData(formRef.current!);
    return {
      ...emptyValues,
      service,
      name: String(data.get("name") || ""),
      organization: String(data.get("organization") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      title: String(data.get("title") || ""),
      content: String(data.get("content") || ""),
      method: String(data.get("method") || ""),
      contactTime: String(data.get("contactTime") || ""),
      referenceUrl: String(data.get("referenceUrl") || ""),
      additionalNotes: String(data.get("additionalNotes") || ""),
      privacyConsent: data.get("privacyConsent") === "on",
      website: String(data.get("website") || ""),
      submissionId: crypto.randomUUID(),
      sourcePage: document.referrer || window.location.pathname,
      pageUrl: window.location.href,
    };
  }

  function focusFirstError(nextErrors: ContactErrors) {
    const first = Object.keys(nextErrors)[0];
    if (!first) return;
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyRef.current) return;
    setStatus(null);
    const values = readValues();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusFirstError(nextErrors);
      setStatus({ type: "error", message: "입력하지 않았거나 형식이 맞지 않는 항목을 확인해 주세요." });
      return;
    }

    const signature = JSON.stringify([values.service, values.name, values.phone, values.title, values.content]);
    if (lastSubmission.current?.signature === signature && Date.now() - lastSubmission.current.time < 60_000) {
      setStatus({ type: "error", message: "같은 내용의 문의가 처리 중입니다. 잠시 후 다시 시도해 주세요." });
      return;
    }

    busyRef.current = true;
    setBusy(true);
    lastSubmission.current = { signature, time: Date.now() };
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({})) as ApiResult;
      if (!response.ok || result.success !== true || !result.receiptId) {
        if (result.fields) { setErrors(result.fields); focusFirstError(result.fields); }
        throw new Error(result.message || "접수 내용을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
      setStatus({ type: "success", message: "상담 신청이 접수되었습니다", receiptId: result.receiptId });
      formRef.current?.reset();
      setService("");
      setErrors({});
    } catch (error) {
      lastSubmission.current = null;
      setStatus({ type: "error", message: error instanceof Error ? error.message : "접수 중 오류가 발생했습니다." });
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  if (status?.type === "success") return <section className="contact-success" aria-live="polite">
    <CheckCircle2 aria-hidden="true"/>
    <p className="eyebrow">RECEIVED</p>
    <h2>{status.message}</h2>
    <p>접수 내용을 확인한 후 입력하신 연락처로 안내드리겠습니다.</p>
    <p className="contact-receipt">접수번호 <strong>{status.receiptId}</strong></p>
    <small>업무 내용과 일정에 따라 회신 시간이 달라질 수 있습니다.</small>
    <div className="button-row"><Link className="button primary" href="/">홈으로 돌아가기</Link><Link className="button outline" href="/services">업무 분야 확인하기</Link></div>
  </section>;

  const fieldError = (name: keyof ContactFormValues) => errors[name] ? <p className="contact-field-error" id={`${name}-error`}><AlertCircle/>{errors[name]}</p> : null;
  const describedBy = (name: keyof ContactFormValues) => errors[name] ? `${name}-error` : undefined;

  return <form className="contact-application-form" ref={formRef} onSubmit={submit} noValidate>
    <div className="contact-form-heading"><p className="eyebrow">APPLICATION FORM</p><h2>상담 신청서</h2><p><span className="required-mark" aria-hidden="true">*</span> 표시는 필수 입력 항목입니다.</p></div>
    {status?.type === "error" && <div className="contact-status error" role="alert"><AlertCircle/>{status.message}</div>}

    <div className="contact-field full"><label htmlFor="service">상담 분야 <span className="required-mark" aria-hidden="true">*</span><span className="sr-only">필수</span></label>
      <select id="service" name="service" value={service} onChange={e => setService(e.target.value)} aria-invalid={!!errors.service} aria-describedby={describedBy("service")}>
        <option value="">상담 분야 선택</option>{contactServices.map(item => <option key={item}>{item}</option>)}
      </select>{fieldError("service")}</div>

    <div className="contact-fields two">
      <div className="contact-field"><label htmlFor="name">이름 <span className="required-mark" aria-hidden="true">*</span><span className="sr-only">필수</span></label><input id="name" name="name" autoComplete="name" maxLength={80} aria-invalid={!!errors.name} aria-describedby={describedBy("name")}/>{fieldError("name")}</div>
      <div className="contact-field"><label htmlFor="organization">회사명 또는 단체명 <span className="optional">선택</span></label><input id="organization" name="organization" autoComplete="organization" maxLength={120}/></div>
      <div className="contact-field"><label htmlFor="phone">연락처 <span className="required-mark" aria-hidden="true">*</span><span className="sr-only">필수</span></label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="예: 010-1234-5678" maxLength={30} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")}/>{fieldError("phone")}</div>
      <div className="contact-field"><label htmlFor="email">이메일 <span className="optional">선택</span></label><input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} aria-invalid={!!errors.email} aria-describedby={describedBy("email")}/>{fieldError("email")}</div>
      <div className="contact-field"><label htmlFor="method">희망 상담 방식 <span className="optional">선택</span></label><select id="method" name="method" aria-invalid={!!errors.method} aria-describedby={describedBy("method")}><option value="">선택해 주세요</option>{consultationMethods.map(item => <option key={item}>{item}</option>)}</select>{fieldError("method")}</div>
      <div className="contact-field"><label htmlFor="contactTime">연락 가능한 시간 <span className="optional">선택</span></label><select id="contactTime" name="contactTime" aria-invalid={!!errors.contactTime} aria-describedby={`contact-time-note ${describedBy("contactTime") || ""}`}><option value="">선택해 주세요</option>{contactTimes.map(item => <option key={item}>{item}</option>)}</select><small id="contact-time-note">연락 희망시간이며 상담 가능시간을 보장하지 않습니다.</small>{fieldError("contactTime")}</div>
    </div>

    <div className="contact-field full"><label htmlFor="title">문의 제목 <span className="required-mark" aria-hidden="true">*</span><span className="sr-only">필수</span></label><input id="title" name="title" maxLength={120} placeholder="문의 내용을 한 줄로 적어주세요" aria-invalid={!!errors.title} aria-describedby={describedBy("title")}/>{fieldError("title")}</div>
    <div className="contact-field full"><label htmlFor="content">현재 상황 및 문의 내용 <span className="required-mark" aria-hidden="true">*</span><span className="sr-only">필수</span></label><textarea id="content" name="content" minLength={20} maxLength={2000} placeholder="현재 상황, 받은 문서와 날짜, 처리기한, 원하는 도움을 20자 이상 적어주세요." aria-invalid={!!errors.content} aria-describedby={`sensitive-note ${describedBy("content") || ""}`}/><p className="contact-sensitive" id="sensitive-note"><ShieldCheck/>주민등록번호, 여권번호, 계좌정보 등 민감한 개인정보는 입력하지 마세요. 관련 서류는 상담 후 안내된 방법으로 전달해주시기 바랍니다.</p>{fieldError("content")}</div>
    <div className="contact-field full"><label htmlFor="referenceUrl">참고 링크 <span className="optional">선택</span></label><input id="referenceUrl" name="referenceUrl" type="url" inputMode="url" placeholder="https://" maxLength={500} aria-invalid={!!errors.referenceUrl} aria-describedby={describedBy("referenceUrl")}/>{fieldError("referenceUrl")}</div>
    <div className="contact-field full"><label htmlFor="additionalNotes">개인정보가 포함되지 않은 추가 참고사항 <span className="optional">선택</span></label><textarea className="short" id="additionalNotes" name="additionalNotes" maxLength={500}/></div>

    <div className="contact-honeypot" aria-hidden="true"><label htmlFor="website">웹사이트</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <div className="contact-consent">
      <label><input type="checkbox" name="privacyConsent" aria-invalid={!!errors.privacyConsent} aria-describedby={describedBy("privacyConsent")}/><span>상담 접수를 위한 개인정보 수집 및 이용에 동의합니다. <b>(필수)</b></span></label>
      {fieldError("privacyConsent")}
      <details><summary>자세히 보기</summary><div><p><b>수집 항목</b> 이름, 연락처, 이메일(선택), 회사명(선택), 상담 분야, 문의 내용, 희망 상담 방식 및 시간, 참고 링크</p><p><b>수집 목적</b> 상담 요청 확인, 연락, 업무 가능 여부 검토 및 상담 이력 관리</p><p><b>보유 기간</b> {CONTACT_RETENTION_PERIOD}</p><p><b>동의 거부 권리</b> 동의하지 않을 권리가 있으나 필수정보 동의를 거부할 경우 온라인 상담 접수가 제한될 수 있습니다.</p><p><b>민감정보 제한</b> 주민등록번호, 여권번호, 계좌정보와 원본서류는 입력하거나 첨부하지 마세요.</p><Link href="/privacy">개인정보처리방침 전체 보기 →</Link></div></details>
    </div>
    <button className="button gold contact-submit" type="submit" disabled={busy} aria-busy={busy}>{busy ? <><LoaderCircle className="spin"/> 접수 내용을 저장하는 중</> : "상담 신청 접수하기"}</button>
    <p className="contact-submit-note">저장 API에서 정상 저장을 확인한 경우에만 접수 완료로 안내합니다.</p>
  </form>;
}
