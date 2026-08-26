export const CONTACT_RETENTION_PERIOD = "상담 접수일로부터 1년 또는 동의 철회 시까지";

export const contactServices = [
  "출입국·비자",
  "인허가",
  "행정심판",
  "기업행정",
  "부동산 행정",
  "사실조사·내용증명·행정서류",
  "기타 행정업무",
] as const;

export const consultationMethods = ["전화 상담", "방문 상담", "온라인 상담", "상담 후 결정"] as const;
export const contactTimes = ["오전 9시~12시", "오후 12시~3시", "오후 3시~6시", "별도 협의"] as const;

export const serviceQueryMap: Record<string, (typeof contactServices)[number]> = {
  immigration: "출입국·비자",
  licensing: "인허가",
  appeal: "행정심판",
  corporate: "기업행정",
  "real-estate": "부동산 행정",
  documents: "사실조사·내용증명·행정서류",
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
