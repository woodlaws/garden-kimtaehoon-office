export const CONTACT_RETENTION_PERIOD = "상담 목적 달성 후 관련 법령과 내부 기준에 따라 파기";

export const contactServices = [
  "기업 인허가·인증",
  "농업경영 컨설팅",
  "노인복지사업 창업",
  "행정심판·민원행정",
  "기타 문의",
] as const;

export const consultationMethods = ["전화 상담", "방문 상담", "온라인 상담", "상담 후 결정"] as const;
export const contactTimes = ["오전 9시~12시", "오후 12시~3시", "오후 3시~6시", "별도 협의"] as const;

export const serviceQueryMap: Record<string, (typeof contactServices)[number]> = {
  business: "기업 인허가·인증",
  agriculture: "농업경영 컨설팅",
  welfare: "노인복지사업 창업",
  appeal: "행정심판·민원행정",
  corporate: "기업 인허가·인증",
  licensing: "기업 인허가·인증",
  "business-certification": "기업 인허가·인증",
  "agriculture-consulting": "농업경영 컨설팅",
  "senior-welfare-startup": "노인복지사업 창업",
  "administrative-appeal": "행정심판·민원행정",
};

export type ContactFormValues = {
  service: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  title: string;
  content: string;
  method: string;
  contactTime: string;
  referenceUrl: string;
  additionalNotes: string;
  privacyConsent: boolean;
  website: string;
  submissionId: string;
  sourcePage: string;
  pageUrl: string;
};

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

const phonePattern = /^[0-9+()\-\s]{8,24}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!contactServices.includes(values.service as (typeof contactServices)[number])) errors.service = "상담 분야를 선택해 주세요.";
  if (values.name.trim().length < 2) errors.name = "이름을 2자 이상 입력해 주세요.";
  if (!phonePattern.test(values.phone.trim())) errors.phone = "연락처를 숫자, 공백 또는 하이픈을 사용해 8자 이상 입력해 주세요.";
  if (values.email && !emailPattern.test(values.email.trim())) errors.email = "이메일 형식을 확인해 주세요.";
  if (values.title.trim().length < 2) errors.title = "문의 제목을 2자 이상 입력해 주세요.";
  const contentLength = values.content.trim().length;
  if (contentLength < 20 || contentLength > 2000) errors.content = "문의 내용은 20자 이상 2,000자 이하로 입력해 주세요.";
  if (values.referenceUrl) {
    try { const url = new URL(values.referenceUrl); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); }
    catch { errors.referenceUrl = "http:// 또는 https://로 시작하는 주소를 입력해 주세요."; }
  }
  if (values.method && !consultationMethods.includes(values.method as (typeof consultationMethods)[number])) errors.method = "희망 상담 방식을 확인해 주세요.";
  if (values.contactTime && !contactTimes.includes(values.contactTime as (typeof contactTimes)[number])) errors.contactTime = "연락 희망시간을 확인해 주세요.";
  if (!values.privacyConsent) errors.privacyConsent = "개인정보 수집·이용 동의가 필요합니다.";
  return errors;
}
