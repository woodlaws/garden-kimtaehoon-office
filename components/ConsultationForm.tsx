"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/data/site";

export function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const immigrationMode = category === "출입국·비자";
  const licensingMode = category === "각종 인허가";
  const appealMode = category === "행정심판·행정처분 구제";
  const corporateMode = category === "기업·법인 행정";
  const specialistMode = immigrationMode || licensingMode || appealMode || corporateMode;
  const busy = useRef(false);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("service");
    const selected = services.find((service) => service.consultationQuery === query);
    if (selected) setCategory(selected.title);
  }, []);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); busy.current = false; return; }
    setMessage("현재 온라인 저장 기능은 연결 준비 중입니다. 민감한 정보를 입력하지 말고, 연락처가 확정된 뒤 전화 상담을 이용해 주세요.");
    busy.current = false;
  }
  return <form className={`consult-form ${compact ? "compact" : ""}`} onSubmit={submit} noValidate={false}>
    <div className="form-grid">
      <label>이름 <span>*</span><input name="name" required autoComplete="name" placeholder="성함을 입력하세요"/></label>
      <label>연락처 <span>*</span><input name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{8,20}" placeholder="숫자와 하이픈만 입력"/></label>
      {!compact && !specialistMode && <label>이메일<input name="email" type="email" autoComplete="email" placeholder="답변받을 이메일"/></label>}
      <label>상담 분야 <span>*</span><select name="category" required value={category} onChange={(event) => setCategory(event.target.value)}><option value="" disabled>선택해 주세요</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}</select></label>
      {immigrationMode && <><label>국적 <span>*</span><input name="nationality" required maxLength={60} placeholder="예: 베트남"/></label><label>현재 체류자격 <span>*</span><input name="currentStatus" required maxLength={40} placeholder="예: D-2 (모르면 '확인 필요')"/></label><label>체류기간 만료일 <span>*</span><input name="expiryDate" required type="date"/></label><label>상담 목적 <span>*</span><select name="purpose" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>체류기간 연장</option><option>체류자격 변경</option><option>초청·사증</option><option>외국인등록·신고</option><option>영주·국적</option><option>보완·소명</option><option>어떤 절차인지 확인 필요</option></select></label></>}
      {licensingMode && <><label>신청 주체 <span>*</span><select name="entityType" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>개인</option><option>법인</option><option>아직 미정</option></select></label><label>업종·영업 내용 <span>*</span><input name="businessType" required maxLength={100} placeholder="예: 일반음식점, 제조업"/></label><label>사업 예정 지역 <span>*</span><input name="businessLocation" required maxLength={100} placeholder="시·군·구와 주소 범위"/></label><label>요청 유형 <span>*</span><select name="licensingRequestType" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>신규</option><option>변경</option><option>갱신</option><option>승계</option><option>보완</option><option>어떤 절차인지 확인 필요</option></select></label><label>임대차 상태 <span>*</span><select name="leaseStatus" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>계약 전</option><option>계약 완료</option><option>자가 사업장</option><option>확인 필요</option></select></label><label>공사 진행 상태 <span>*</span><select name="constructionStatus" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>공사 전</option><option>공사 중</option><option>공사 완료</option><option>해당 없음</option></select></label><label>현재 받은 안내·처분<input name="agencyNotice" maxLength={160} placeholder="보완요청, 반려, 사전통지 등이 있다면 입력"/></label></>}
      {appealMode && <><label>처분기관 <span>*</span><input name="dispositionAgency" required maxLength={100} placeholder="처분기관과 담당부서"/></label><label>처분 또는 예정 처분 종류 <span>*</span><input name="dispositionType" required maxLength={120} placeholder="예: 영업정지, 허가취소, 과징금"/></label><label>문서 구분 <span>*</span><select name="documentType" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>사전통지서</option><option>처분서</option><option>거부·반려 통지</option><option>기타 안내문</option><option>문서 종류 확인 필요</option></select></label><label>문서를 받은 날짜 <span>*</span><input name="receivedDate" type="date" required/></label><label>의견제출·불복기한<input name="statedDeadline" type="date"/><small>문서에 적힌 날짜만 입력하며 자동 법정기한으로 판단하지 않습니다.</small></label><label>사업·자격에 미치는 영향 <span>*</span><input name="currentImpact" required maxLength={160} placeholder="영업, 자격, 생계 등에 미치는 영향"/></label><label>기존 제출자료 <span>*</span><select name="previousSubmission" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>제출한 자료 있음</option><option>제출한 자료 없음</option><option>확인 필요</option></select></label></>}
      {corporateMode && <><label>회사·단체명 <span>*</span><input name="organizationName" required maxLength={100} placeholder="정해지지 않았다면 '미정'"/></label><label>조직 구분 <span>*</span><select name="organizationType" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>개인사업자</option><option>영리법인</option><option>비영리법인</option><option>비영리민간단체·협회·조합</option><option>아직 미정</option></select></label><label>업무 유형 <span>*</span><select name="corporateRequestType" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>신규 설립허가 준비</option><option>변경허가·변경신고</option><option>갱신·재등록</option><option>보완·소명자료</option><option>기타·업무 구분 필요</option></select></label><label>주요 사업 목적 <span>*</span><input name="businessPurpose" required maxLength={160} placeholder="주요 사업과 활동 내용"/></label><label>현재 진행 단계 <span>*</span><input name="currentStage" required maxLength={120} placeholder="예: 형태 검토, 서류 준비, 보완 요청"/></label><label>관할·예상 주무관청<input name="supervisingAuthority" maxLength={120} placeholder="알고 있다면 입력"/></label><label>제출기한<input name="submissionDeadline" type="date"/></label><label>필요한 업무 <span>*</span><input name="requiredWork" required maxLength={180} placeholder="정관, 사업계획서, 변경신고 등"/></label></>}
      {!compact && !specialistMode && <><label>상담 방식<select name="method" defaultValue="전화"><option>전화</option><option>방문</option><option>온라인</option></select></label><label>문의 제목 <span>*</span><input name="title" required maxLength={80}/></label></>}
    </div>
    <label>문의 내용 <span>*</span><textarea name="content" required minLength={20} maxLength={2000} placeholder="받은 문서의 종류와 날짜, 현재 상황을 개인정보 없이 적어 주세요."/></label>
    {immigrationMode && <p className="form-privacy-warning">여권번호·외국인등록번호·사본 파일 등 민감정보는 입력하지 마세요. 초기 상담 단계에서는 파일을 받지 않습니다.</p>}
    {licensingMode && <p className="form-privacy-warning">사업자등록번호·주민등록번호 등 민감정보는 입력하지 마세요. 초기 상담 단계에서는 파일을 받지 않습니다.</p>}
    {appealMode && <p className="form-privacy-warning">주민등록번호·사업자번호 등 민감정보는 입력하지 마세요. 날짜 입력만으로 법적 마감일을 확정하지 않으며 초기 상담 단계에서는 파일을 받지 않습니다.</p>}
    {corporateMode && <p className="form-privacy-warning">사업자등록번호·주민등록번호 등 민감정보는 입력하지 마세요. 법인등기·세무·노무·소송·특허 업무는 별도 전문영역으로 구분하며 초기 상담 단계에서는 파일을 받지 않습니다.</p>}
    {!compact && !specialistMode && <><label>관련 링크<input name="link" type="url" placeholder="https://"/></label><label>첨부파일<input name="attachment" type="file" disabled/><small>보안 저장소 연결 후 활성화됩니다.</small></label></>}
    <label className="check"><input type="checkbox" required/> <span><Link href="/privacy">개인정보 수집·이용 안내</Link>를 확인하고 동의합니다. <b>*</b></span></label>
    <div className="form-submit"><p>스팸 방지를 위해 동일한 내용의 반복 제출은 제한됩니다.</p><button className="button gold" type="submit">상담 내용 확인</button></div>
    {message && <p className="form-message" role="status">{message}</p>}
  </form>;
}

export function InquiryBoardForm() {
  const [message, setMessage] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setMessage("문의 저장소가 아직 연결되지 않아 등록되지 않았습니다. Supabase 환경변수를 설정하면 비공개 저장과 관리자 답변 기능을 연결할 수 있습니다.");
  }
  return <form className="consult-form board-form" onSubmit={submit}>
    <div className="connection-status"><b>현재 연결 상태</b><span>데이터베이스 연결 전 · 등록 불가</span></div>
    <div className="form-grid"><label>이름 <span>*</span><input required autoComplete="name"/></label><label>연락처 <span>*</span><input required inputMode="tel" pattern="[0-9+() -]{8,20}" autoComplete="tel"/></label><label>이메일<input type="email" autoComplete="email"/></label><label>문의 분야 <span>*</span><select required defaultValue=""><option value="" disabled>선택해 주세요</option><option>출입국·비자</option><option>기업·법인 행정</option><option>각종 인허가</option><option>행정심판·처분 구제</option><option>기타</option></select></label></div>
    <label>제목 <span>*</span><input required maxLength={80}/></label><label>문의 내용 <span>*</span><textarea required minLength={20} maxLength={2000}/></label>
    <div className="form-grid"><fieldset><legend>공개 여부</legend><label className="radio"><input type="radio" name="visibility" value="private" defaultChecked/> 비공개</label><label className="radio"><input type="radio" name="visibility" value="public"/> 공개</label></fieldset><label>게시글 비밀번호 <span>*</span><input type="password" required minLength={4} maxLength={20} autoComplete="new-password"/></label></div>
    <label>파일 첨부<input type="file" disabled/><small>보안 파일 저장소 연결 후 활성화됩니다.</small></label><label className="check"><input type="checkbox" required/><span><Link href="/privacy">개인정보 수집·이용 안내</Link>에 동의합니다. <b>*</b></span></label>
    <button className="button gold" type="submit">연결 상태 확인</button>{message&&<p className="form-message" role="status">{message}</p>}
  </form>;
}
