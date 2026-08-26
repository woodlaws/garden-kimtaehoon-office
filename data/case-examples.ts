export const CASE_EXAMPLE_NOTICE = "아래 내용은 업무 이해를 돕기 위해 일반적인 상황을 바탕으로 구성한 진행 예시입니다. 실제 수행 사례와 결과를 의미하지 않으며, 구체적인 절차와 가능 여부는 개별 상황과 관련 법령에 따라 달라질 수 있습니다.";

export const caseCategories = [
  { value: "all", label: "전체" },
  { value: "immigration", label: "출입국·비자" },
  { value: "licensing", label: "인허가" },
  { value: "appeal", label: "행정심판" },
  { value: "corporate", label: "기업행정" },
  { value: "real-estate", label: "부동산 행정" },
  { value: "documents", label: "사실조사·행정서류" },
] as const;

export type CaseExample = {
  id: string;
  type: "example" | "case";
  published: boolean;
  featured: boolean;
  category: Exclude<(typeof caseCategories)[number]["value"], "all">;
  categoryLabel: string;
  slug: string;
  title: string;
  summary: string;
  situation: string;
  keyIssues: string[];
  documents: string[];
  process: string[];
  direction: string[];
  cautions: string[];
  relatedService: string;
  contactService: string;
  publishedAt: string;
  updatedAt: string;
  actualCaseVerified: boolean;
  consentConfirmed: boolean;
};

// `type: "case"`는 실제 수행 여부, 공개 동의, 익명화 검수를 모두 확인한 뒤에만 사용합니다.
export const caseExamples: CaseExample[] = [
  {
    id: "example-visa-extension", type: "example", published: true, featured: true,
    category: "immigration", categoryLabel: "출입국·비자", slug: "visa-extension-preparation",
    title: "체류기간 만료를 앞둔 외국인의 체류 연장 준비",
    summary: "체류기간 만료 전 현재 자격과 국내 활동을 확인하고, 연장 신청에 필요한 자료와 제출 순서를 정리하는 상황입니다.",
    situation: "국내 체류 중인 외국인이 체류기간 만료를 앞두고 연장 신청에 필요한 조건과 서류를 확인하려는 상황",
    keyIssues: ["현재 체류자격", "체류기간 만료일", "국내 활동 내용", "고용·소득·거주 관련 자료", "출입국 기록 및 기존 신청내역"],
    documents: ["여권과 외국인등록 관련 자료", "고용·재직 또는 활동을 확인할 자료", "소득과 거주지를 확인할 자료", "기존 출입국 신청서류와 보완 안내"],
    process: ["현재 체류자격과 만료일 확인", "국내 활동 및 신청 목적 정리", "자격별 제출자료 점검", "신청·보완 절차 안내"],
    direction: ["현재 자격과 신청 가능 여부 확인", "필요한 자료 목록 정리", "신청서류 작성 및 제출절차 안내", "보완 요청 가능 항목 사전 점검"],
    cautions: ["체류자격과 개인 상황에 따라 요구서류와 절차가 달라질 수 있습니다.", "승인 여부를 보장하지 않습니다."],
    relatedService: "/services/immigration-visa", contactService: "immigration", publishedAt: "2026-08-27", updatedAt: "2026-08-27", actualCaseVerified: false, consentConfirmed: false,
  },
  {
    id: "example-restaurant-license", type: "example", published: true, featured: true,
    category: "licensing", categoryLabel: "인허가", slug: "restaurant-license-check",
    title: "음식점 영업을 준비하는 사업자의 인허가 확인",
    summary: "음식점 개업 전 업종과 사업장 조건을 기준으로 필요한 신고·허가, 시설기준과 준비자료를 확인하는 상황입니다.",
    situation: "음식점 개업을 준비하면서 사업장과 영업 형태에 필요한 신고·허가 사항을 확인하려는 상황",
    keyIssues: ["업종과 영업 형태", "사업장 소재지와 용도", "시설기준", "관할 행정기관", "필요한 교육과 구비서류"],
    documents: ["사업 내용과 예정 메뉴", "사업장 임대차 및 건축물 관련 자료", "시설 배치와 설비 계획", "교육 이수 및 관할기관 안내자료"],
    process: ["영업 형태와 사업장 확인", "관할기관 및 관계 기준 검토", "시설·교육·서류 항목 점검", "신청·신고 순서 안내"],
    direction: ["업종별 인허가 항목 확인", "관할기관과 처리절차 확인", "시설 및 준비자료 점검", "신청·신고 서류 준비"],
    cautions: ["건축물 용도, 소방, 위생 등 관계기관의 별도 확인이 필요할 수 있습니다."],
    relatedService: "/services/permits", contactService: "licensing", publishedAt: "2026-08-27", updatedAt: "2026-08-27", actualCaseVerified: false, consentConfirmed: false,
  },
  {
    id: "example-disposition-response", type: "example", published: true, featured: true,
    category: "appeal", categoryLabel: "행정심판", slug: "administrative-disposition-response",
    title: "행정처분 통지를 받은 사업자의 대응 준비",
    summary: "영업정지 등 행정처분 통지를 받은 뒤 처분 사유와 수령일, 의견제출 또는 불복 관련 기한을 먼저 확인하는 상황입니다.",
    situation: "행정기관으로부터 영업정지 등 처분 통지를 받고 처분 내용과 대응기한을 확인하려는 상황",
    keyIssues: ["처분서 수령일", "처분 사유와 법적 근거", "사전통지 및 의견제출 여부", "관련 사실관계와 증빙자료", "불복 또는 의견제출 기한"],
    documents: ["처분서와 사전통지서 전체", "송달일을 확인할 수 있는 자료", "기존 의견서와 기관 제출자료", "사실관계 및 증빙자료"],
    process: ["처분서와 수령일 확인", "처분 경위와 근거자료 정리", "가능한 행정절차 검토", "제출자료와 기한 안내"],
    direction: ["처분서와 진행 경위 확인", "관련 자료와 주장 내용 정리", "가능한 행정절차 검토", "제출서류 및 기한 안내"],
    cautions: ["온라인 상담 접수만으로 불복기간이 연장되거나 준수되는 것은 아닙니다.", "행정사는 소송대리를 수행하지 않으며, 소송 관련 판단은 해당 법률전문가의 검토가 필요할 수 있습니다."],
    relatedService: "/services/appeal", contactService: "appeal", publishedAt: "2026-08-27", updatedAt: "2026-08-27", actualCaseVerified: false, consentConfirmed: false,
  },
  {
    id: "example-corporate-checklist", type: "example", published: true, featured: false,
    category: "corporate", categoryLabel: "기업행정", slug: "corporate-administration-checklist",
    title: "법인 설립 이후 필요한 기업 행정업무 정리",
    summary: "법인 설립 후 실제 업종과 사업 단계를 기준으로 필요한 신고, 인허가, 기관 제출서류와 갱신 일정을 정리하는 상황입니다.",
    situation: "법인 설립 후 사업 운영에 필요한 신고, 인허가 및 행정서류를 정리하려는 상황",
    keyIssues: ["법인과 사업의 기본정보", "실제 영위 업종", "필요한 인허가와 신고", "행정기관 제출서류", "변경 또는 갱신 일정"],
    documents: ["법인과 사업자 기본자료", "정관과 사업계획 관련 자료", "현재 보유한 허가·신고 서류", "기관 제출 및 갱신 일정 자료"],
    process: ["법인·사업 현황 확인", "업종별 행정업무 분류", "제출자료와 일정 점검", "다른 전문영역 구분 및 안내"],
    direction: ["사업 단계별 행정업무 목록화", "신고·허가 대상 확인", "제출서류와 일정 정리", "필요한 전문자격사 업무 구분"],
    cautions: ["법인등기, 세무신고, 노무 및 특허 업무 등은 해당 전문가의 검토가 필요할 수 있습니다."],
    relatedService: "/services/corporate", contactService: "corporate", publishedAt: "2026-08-27", updatedAt: "2026-08-27", actualCaseVerified: false, consentConfirmed: false,
  },
  {
    id: "example-land-use", type: "example", published: true, featured: false,
    category: "real-estate", categoryLabel: "부동산 행정", slug: "land-use-administration-check",
    title: "토지 이용과 개발행위 관련 행정절차 확인",
    summary: "토지의 기본정보와 계획 중인 이용 목적을 기준으로 규제사항, 필요한 인허가와 관계기관 협의 여부를 확인하는 상황입니다.",
    situation: "보유하거나 계약을 검토 중인 토지에서 특정 시설 또는 개발행위가 가능한지 행정절차를 확인하려는 상황",
    keyIssues: ["토지 소재지", "지목과 용도지역", "계획 중인 이용 목적", "건축물과 기존 시설", "관계기관 협의 여부"],
    documents: ["토지대장·지적도 등 기본 공부", "토지 위치와 현황을 확인할 자료", "계획 중인 시설 또는 이용 내용", "기존 허가·협의 및 기관 안내자료"],
    process: ["토지와 이용계획 확인", "기본 규제 및 관할 검토", "필요한 인허가 절차 분류", "협업 영역과 준비자료 안내"],
    direction: ["기본 토지정보와 규제사항 확인", "필요한 인허가 절차 분류", "관할기관과 준비자료 확인", "관련 전문가 협업 필요 여부 안내"],
    cautions: ["매매가치, 감정평가, 설계, 등기 또는 법률판단은 해당 전문가의 검토가 필요한 별도 영역입니다."],
    relatedService: "/services/land-property", contactService: "real-estate", publishedAt: "2026-08-27", updatedAt: "2026-08-27", actualCaseVerified: false, consentConfirmed: false,
  },
  {
    id: "example-unpaid-rent", type: "example", published: true, featured: false,
    category: "documents", categoryLabel: "사실조사·행정서류", slug: "unpaid-rent-content-certification",
    title: "임대료 미납 관련 내용증명 준비",
    summary: "계약과 입금내역, 상대방과의 대화를 날짜순으로 정리하고 요구사항과 이행기한을 문서로 전달하려는 상황입니다.",
    situation: "임대료 미납 경위와 입금내역을 정리하여 상대방에게 요구사항을 문서로 전달하려는 상황",
    keyIssues: ["계약서", "보증금과 월 임대료", "납부 및 미납내역", "상대방과 주고받은 문자", "요구사항과 이행기한"],
    documents: ["임대차계약서", "입금 및 미납내역", "상대방과 주고받은 문자·이메일", "전달하려는 요구사항과 이행기한 메모"],
    process: ["계약과 입금자료 확인", "사실관계 시간순 정리", "전달 목적과 요구사항 구체화", "문안 및 발송절차 안내"],
    direction: ["계약 및 입금자료 확인", "날짜순 사실관계 정리", "전달 목적과 요구사항 확인", "내용증명 문안 및 발송절차 안내"],
    cautions: ["내용증명은 발송 문서의 내용과 발송 사실을 증명하는 수단이며, 기재 사실의 진실이나 법적 판단을 자동으로 확정하지 않습니다.", "명도소송과 강제집행은 행정사가 수행하는 업무로 안내하지 않습니다."],
    relatedService: "/services/documents", contactService: "documents", publishedAt: "2026-08-27", updatedAt: "2026-08-27", actualCaseVerified: false, consentConfirmed: false,
  },
];

export const publishedCaseExamples = caseExamples.filter(item => item.published);
