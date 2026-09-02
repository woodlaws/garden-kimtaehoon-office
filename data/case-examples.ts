export const CASE_DISCLAIMER = "본 사례는 개별 의뢰 업무의 진행 결과를 소개한 것으로, 유사한 사안에서도 동일한 결과를 보장하지 않습니다. 구체적인 업무 가능 여부와 절차는 관련 자료 및 사실관계 검토 후 안내됩니다.";
export const CASE_EXAMPLE_NOTICE = CASE_DISCLAIMER;

export const caseCategories = [
  { value: "all", label: "전체" },
  { value: "business", label: "기업" },
  { value: "agriculture", label: "농업" },
  { value: "senior", label: "노인복지" },
  { value: "appeal", label: "행정심판·민원" },
] as const;

export type CaseCategory = Exclude<(typeof caseCategories)[number]["value"], "all">;
export type CaseEvidence = { src: string; width: number; height: number; alt: string; caption: string };

export type CaseExample = {
  id: string;
  type: "case";
  published: boolean;
  featured: boolean;
  category: CaseCategory;
  categoryLabel: string;
  slug: string;
  title: string;
  summary: string;
  background: string[];
  administrativeIssues: string[];
  workProgress: string[];
  result: string[];
  similarChecks: string[];
  relatedService: string;
  relatedServiceLabel: string;
  contactService: string;
  originalUrl: string;
  originalTitle: string;
  evidence: CaseEvidence[];
  updatedAt: string;
  actualCaseVerified: boolean;
};

export const caseExamples: CaseExample[] = [
  {
    id: "case-venture-certification", type: "case", published: true, featured: true,
    category: "business", categoryLabel: "기업 인허가·인증", slug: "venture-certification",
    title: "벤처기업 재인증 취득 사례",
    summary: "사업계획서의 논리와 증빙자료를 사전에 점검해 벤처기업 재인증 심사를 준비하고, 원문 기준 큰 보완·수정 요구 없이 인증을 마친 사례입니다.",
    background: ["기존 인증 이후 벤처기업 재인증을 준비한 기업의 사례입니다.", "원문은 강화된 심사 기준에 맞춰 사업계획서의 논리와 증빙자료를 더 면밀히 준비해야 하는 상황이었다고 설명합니다."],
    administrativeIssues: ["기업 현황과 기존 제출자료를 바탕으로 재인증 심사에 맞는 논리를 정리하는 일", "심사 과정의 보완·수정 가능성을 줄이도록 사업계획서와 증빙자료를 사전에 점검하는 일"],
    workProgress: ["가든 행정사사무소가 기업 상황을 사전 분석하고 맞춤형 준비를 진행했다고 원문에서 확인됩니다.", "원문은 인증 이후 기업부설연구소 또는 연구개발전담부서 설립을 검토할 때의 요건과 준비자료도 함께 안내합니다."],
    result: ["원문에서 벤처기업 재인증 완료가 확인됩니다.", "큰 보완·수정 요구 없이 심사를 통과한 결과로 소개되어 있습니다."],
    similarChecks: ["최초 인증인지 재인증인지", "사업계획서의 논리와 이를 뒷받침할 증빙자료가 일치하는지", "기업부설연구소·연구개발전담부서 등 후속 제도 검토가 필요한지"],
    relatedService: "/services/business-certification", relatedServiceLabel: "기업 인허가·인증", contactService: "business-certification",
    originalUrl: "https://blog.naver.com/thkim247/224334029883", originalTitle: "벤처기업 인증 취득 사례로 보는 기업부설연구소·연구개발전담부서 설립 안내",
    evidence: [
      { src: "/images/cases/venture-certification/venture-certification-guide.webp", width: 966, height: 966, alt: "벤처기업 인증과 기업부설연구소 설립 안내 이미지", caption: "원문에 게시된 벤처기업 인증·연구개발 조직 안내 자료 · 자료 제공: 가든 행정사사무소" },
      { src: "/images/cases/venture-certification/research-benefits-guide.webp", width: 966, height: 966, alt: "기업 연구조직 관련 혜택 안내 이미지", caption: "원문에 게시된 기업 연구조직 관련 안내 자료 · 자료 제공: 가든 행정사사무소" },
    ],
    updatedAt: "2026-09-02", actualCaseVerified: true,
  },
  {
    id: "case-young-farmer-support", type: "case", published: true, featured: true,
    category: "agriculture", categoryLabel: "농업경영 종합 컨설팅", slug: "young-farmer-support",
    title: "청년농업인 영농정착지원사업 전원 합격 사례",
    summary: "2025년도 청년농업인 영농정착지원사업 컨설팅 참여자가 원문 기준 모두 최종 선정된 사례입니다.",
    background: ["청년농업인 영농정착지원사업 선정을 준비하는 신청자들의 컨설팅 사례입니다.", "원문은 신청자마다 영농경력, 거주, 병역, 소득과 겸업 여부 등 자격요건을 먼저 확인해야 한다고 안내합니다."],
    administrativeIssues: ["신청자별 지원자격과 지원 제한 요건 확인", "영농계획서와 자격 증빙자료의 준비", "서류전형 이후 면접에서 제출한 영농계획을 일관되게 설명할 수 있도록 준비"],
    workProgress: ["영농계획서를 포함한 서류 작성과 제출을 지원한 것으로 원문에서 확인됩니다.", "서류전형 이후 예상질문지 제공과 온라인 모의면접까지 진행 범위로 안내하고 있습니다."],
    result: ["원문은 2025년도 컨설팅 참여자가 모두 최종 선정됐다고 소개합니다.", "이 결과는 해당 연도와 참여자 사례에 한정되며 향후 선정 결과를 보장하지 않습니다."],
    similarChecks: ["연령·영농경력·거주 등 공고상 자격요건을 충족하는지", "영농계획서와 증빙자료가 실제 준비 상황과 일치하는지", "면접에서 영농계획의 실행 가능성과 의지를 구체적으로 설명할 수 있는지"],
    relatedService: "/services/agriculture-consulting", relatedServiceLabel: "농업경영 종합 컨설팅", contactService: "agriculture-consulting",
    originalUrl: "https://blog.naver.com/thkim247/224065645906", originalTitle: "2026년 청년농업인 영농정착지원사업 신청 시작! (2025년 전원 합격)",
    evidence: [
      { src: "/images/cases/young-farmer-support/young-farmer-application-guide.webp", width: 966, height: 966, alt: "청년농업인 영농정착지원사업 신청 안내 이미지", caption: "원문에 게시된 영농정착지원사업 신청 안내 자료 · 자료 제공: 가든 행정사사무소" },
      { src: "/images/cases/young-farmer-support/young-farmer-schedule-guide.webp", width: 966, height: 966, alt: "청년농업인 영농정착지원사업 접수 일정 안내 이미지", caption: "원문에 게시된 접수 일정 안내 자료 · 자료 제공: 가든 행정사사무소" },
    ],
    updatedAt: "2026-09-02", actualCaseVerified: true,
  },
  {
    id: "case-pyeongtaek-senior-welfare", type: "case", published: true, featured: true,
    category: "senior", categoryLabel: "노인복지사업 창업 컨설팅", slug: "pyeongtaek-senior-welfare",
    title: "경기도 평택시 재가노인복지시설 창업 컨설팅 사례",
    summary: "평택시에서 방문요양·방문목욕 재가노인복지시설 설립을 준비하며 서류, 자체평가, 발표와 면접을 함께 대비한 사례입니다.",
    background: ["경기도 평택시에서 방문요양과 방문목욕 서비스를 제공하는 재가노인복지시설 설립을 준비한 사례입니다.", "원문은 지자체별 심사 기준의 차이를 고려해 평택시가 안내한 준비사항을 세밀하게 맞추는 일이 중요했다고 설명합니다."],
    administrativeIssues: ["사업계획서와 예산서의 내용 일치 및 구비서류 누락 여부 점검", "평택시 지정심사의 자체평가 항목에 맞춘 특화 프로그램과 지역사회 자원 연계 구상", "심사위원 대상 발표와 예산·운영계획 관련 면접 준비"],
    workProgress: ["원문에서 가든 행정사사무소가 해당 설립 과정을 직접 컨설팅한 사실이 확인됩니다.", "서류의 정합성을 점검하고, 자체평가 항목을 사업계획에 반영하며, 발표자료와 면접 대응을 준비하는 흐름으로 정리되어 있습니다."],
    result: ["원문은 평택시 재가복지센터 창업 컨설팅이 성공적으로 마무리됐다고 소개합니다.", "구체적인 지정서나 시설 식별정보는 홈페이지에 공개하지 않았습니다."],
    similarChecks: ["설립 예정 지역의 최신 지정심사 기준과 자체평가 항목", "사업계획서와 예산서의 수치·운영계획이 일치하는지", "발표와 면접에서 인력·예산·운영계획을 설명할 준비가 되어 있는지"],
    relatedService: "/services/senior-welfare-startup", relatedServiceLabel: "노인복지사업 창업 컨설팅", contactService: "senior-welfare-startup",
    originalUrl: "https://blog.naver.com/thkim247/224244198807", originalTitle: "평택시 방문요양/방문목욕 재가복지센터 창업! 설립 핵심 전략",
    evidence: [{ src: "/images/cases/pyeongtaek-senior-welfare/pyeongtaek-senior-welfare-guide.webp", width: 966, height: 966, alt: "평택시 재가복지센터 창업 컨설팅 안내 이미지", caption: "원문에 게시된 평택시 재가복지센터 창업 안내 자료 · 자료 제공: 가든 행정사사무소" }],
    updatedAt: "2026-09-02", actualCaseVerified: true,
  },
  {
    id: "case-farmland-acquisition-certificate", type: "case", published: true, featured: false,
    category: "agriculture", categoryLabel: "농업경영·농지행정", slug: "farmland-acquisition-certificate",
    title: "농지취득자격증명 발급 신청 안내",
    summary: "농지취득자격증명의 신청 유형, 농지위원회 심의와 농업경영계획서 준비 시 확인할 사항을 원문을 바탕으로 정리했습니다.",
    background: ["농지 거래 또는 경매를 앞두고 농지취득자격증명 발급 가능성과 준비사항을 확인하는 상황을 다룬 안내 글입니다.", "원문은 신청인의 상황과 취득 목적에 따라 계획서 제출 여부와 농지위원회 심의 대상 여부가 달라진다고 설명합니다."],
    administrativeIssues: ["신청 목적에 따른 농업경영계획서 또는 주말·체험영농계획서 제출 여부 확인", "농지위원회 심의 대상 여부와 제출기한 확인", "재배작물, 노동력과 농기계 준비 등 영농계획의 구체성과 실행 가능성 정리"],
    workProgress: ["원문은 비농업인, 기존 농업인, 농업법인 등 신청인 유형별로 확인할 자료를 구분합니다.", "경매 취득의 경우 제출기한을 고려해 입찰 전에 관할 지자체의 발급 가능성을 확인하고 준비를 시작할 것을 안내합니다."],
    result: ["해당 원문에서는 특정 의뢰인의 농지취득자격증명 발급 완료 결과를 확인할 수 없습니다.", "따라서 홈페이지에서는 개별 성공 결과를 단정하지 않고 발급 신청 안내 내용만 반영했습니다."],
    similarChecks: ["농지 취득 목적과 신청인 유형", "농지위원회 심의 대상 여부와 제출기한", "농업경영계획이 구체적이고 실제로 이행 가능한지"],
    relatedService: "/services/agriculture-consulting", relatedServiceLabel: "농업경영 종합 컨설팅", contactService: "agriculture-consulting",
    originalUrl: "https://blog.naver.com/thkim247/224384726850", originalTitle: "농사짓기 전 필수 관문, 농지취득자격증명(농취증) 발급 신청 안내",
    evidence: [
      { src: "/images/cases/farmland-acquisition-certificate/farmland-certificate-guide.webp", width: 966, height: 966, alt: "농지취득자격증명 발급 신청과 심사 기준 안내 이미지", caption: "원문에 게시된 농지취득자격증명 안내 자료 · 자료 제공: 가든 행정사사무소" },
      { src: "/images/cases/farmland-acquisition-certificate/farmland-review-types.webp", width: 966, height: 966, alt: "농지취득자격증명 신청 유형 안내 이미지", caption: "원문에 게시된 농지취득자격증명 신청 유형 안내 자료 · 자료 제공: 가든 행정사사무소" },
    ],
    updatedAt: "2026-09-02", actualCaseVerified: false,
  },
  {
    id: "case-business-suspension-appeal", type: "case", published: true, featured: false,
    category: "appeal", categoryLabel: "행정심판·민원행정", slug: "business-suspension-appeal",
    title: "소비기한 위반 영업정지 감경 행정심판 인용 사례",
    summary: "소비기한이 하루 지난 제품 판매로 받은 30일 영업정지 처분에 행정심판을 청구해 15일로 감경된 사례입니다.",
    background: ["영업 시작을 준비하던 시간에 소비기한이 하루 지난 제품이 판매되어 민원이 제기된 사안입니다.", "의뢰인은 30일 영업정지 처분을 받은 뒤 가든 행정사사무소에 상담을 요청했습니다."],
    administrativeIssues: ["처분 경위와 위반 사실을 확인하면서 행정심판을 통한 감경 가능성을 검토하는 일", "30일 영업정지가 영업에 미치는 불이익과 사건의 구체적인 사정을 서면에 정리하는 일"],
    workProgress: ["사건의 전반적인 경위를 상담한 뒤 구제 가능성을 검토하고 업무를 수임한 것으로 원문에서 확인됩니다.", "원문은 영업정지 처분의 불합리성을 구체적으로 서면에 작성해 행정심판을 청구했다고 설명합니다."],
    result: ["행정심판 결과 30일 영업정지 처분이 15일로 감경됐습니다.", "이 결과는 해당 사건의 사실관계에 따른 것으로 다른 사건의 감경을 보장하지 않습니다."],
    similarChecks: ["처분서에 적힌 위반 사실과 처분 내용", "처분서를 받은 날짜와 불복 절차의 기한", "위반 경위와 처분의 불이익을 확인할 수 있는 자료"],
    relatedService: "/services/administrative-appeal", relatedServiceLabel: "행정심판·민원행정", contactService: "administrative-appeal",
    originalUrl: "https://blog.naver.com/thkim247/224135529471", originalTitle: "소비기한 경과 위반 영업정지 구제 안내",
    evidence: [],
    updatedAt: "2026-09-02", actualCaseVerified: true,
  },
  {
    id: "case-clan-organization-number", type: "case", published: true, featured: false,
    category: "appeal", categoryLabel: "민원행정", slug: "clan-organization-number",
    title: "종중 고유번호증 발급 절차 안내",
    summary: "종중 고유번호증 발급을 위해 단체 성격, 정관, 소재지, 창립총회와 접수자료를 준비할 때 확인할 사항을 정리했습니다.",
    background: ["종중 자산을 개인 명의가 아닌 단체 명의로 관리하기 위해 고유번호증 발급 절차를 확인하는 상황을 다룬 안내 글입니다.", "원문은 대표자 변경과 단체의 연속성, 통장 관리와 부동산 관련 후속 절차를 고려해 단체 성격을 검토해야 한다고 설명합니다."],
    administrativeIssues: ["단체의 성격과 대표자 선임 방식 정리", "종중의 소재지, 정관, 직인과 창립총회 의사록 준비", "소재지 사용 권한과 대표자 등 접수에 필요한 자료 확인"],
    workProgress: ["원문은 종원 구성, 소재지 지정, 정관·직인 준비, 창립총회 개최와 회의록 작성의 순서로 안내합니다.", "고유번호증 신청에 필요한 자료를 갖춰 세무서에 접수하는 절차를 설명합니다."],
    result: ["해당 원문에서는 특정 종중의 고유번호증 발급 완료 결과를 확인할 수 없습니다.", "따라서 홈페이지에서는 개별 성공 결과를 단정하지 않고 발급 절차 안내 내용만 반영했습니다."],
    similarChecks: ["대표자 변경 이후에도 유지할 단체 운영 방식", "정관과 창립총회 의사록이 실제 운영 내용과 일치하는지", "소재지 사용 권한과 접수에 필요한 자료를 갖췄는지"],
    relatedService: "/services/administrative-appeal", relatedServiceLabel: "행정심판·민원행정", contactService: "administrative-appeal",
    originalUrl: "https://blog.naver.com/thkim247/224344849120", originalTitle: "종중(문중) 고유번호증 발급 방법 총정리",
    evidence: [
      { src: "/images/cases/clan-organization-number/clan-number-guide.webp", width: 966, height: 966, alt: "종중 고유번호증 발급 안내 이미지", caption: "원문에 게시된 종중 고유번호증 발급 안내 자료 · 자료 제공: 가든 행정사사무소" },
      { src: "/images/cases/clan-organization-number/clan-organization-types.webp", width: 966, height: 966, alt: "종중 단체 성격 선택 안내 이미지", caption: "원문에 게시된 종중 단체 성격 안내 자료 · 자료 제공: 가든 행정사사무소" },
    ],
    updatedAt: "2026-09-02", actualCaseVerified: false,
  },
];

export const publishedCaseExamples = caseExamples.filter((item) => item.published);

export const legacyCaseRedirects: Record<string, string> = {
  "visa-extension-preparation": "/cases",
  "restaurant-license-check": "/cases",
  "administrative-disposition-response": "/cases/business-suspension-appeal",
  "corporate-administration-checklist": "/cases/venture-certification",
  "land-use-administration-check": "/cases/farmland-acquisition-certificate",
  "unpaid-rent-content-certification": "/cases",
};
