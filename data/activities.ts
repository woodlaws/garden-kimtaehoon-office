export type ActivityImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  position?: string;
};

export type EducationActivity = {
  slug: string;
  title: string;
  category: "농업경영 교육" | "교육 활동";
  summary: string;
  overview: string;
  period: string;
  sourceLabel: string;
  venue?: string;
  topics: string[];
  images: ActivityImage[];
  relatedService?: string;
};

export const educationActivities: EducationActivity[] = [
  {
    slug: "agricultural-professional-management",
    title: "농업전문경영인 육성교육",
    category: "농업경영 교육",
    summary: "농업법인 설립과 기업 인증 등 농업경영에 필요한 행정 정보를 실제 화면과 함께 설명한 교육 현장입니다.",
    overview: "농업경영 과정에서 접하게 되는 법인 설립과 인증 제도를 교육생의 눈높이에 맞춰 설명했습니다. 공개 화면에는 사진에서 확인되는 범위의 교육 내용만 담았습니다.",
    period: "2026. 4. 30. ~ 8. 24. (현수막 표기)",
    sourceLabel: "예천군농업기술센터 (현수막 표기)",
    topics: [
      "농업법인 설립의 주요 혜택과 검토 사항",
      "여성기업인증 신청 시 확인할 자료와 절차",
      "강의 화면과 문답을 활용한 농업경영 행정 정보 안내",
    ],
    relatedService: "/services/agriculture-consulting",
    images: [
      { src: "/images/activities/farm-manager/classroom-main.webp", alt: "교육생 앞에서 강의하는 김태훈 행정사", caption: "교육생과 문답하며 진행한 농업전문경영인 육성교육", width: 1800, height: 1350, position: "center 42%" },
      { src: "/images/activities/farm-manager/corporation-benefits.webp", alt: "농업법인 설립 혜택을 설명하는 김태훈 행정사", caption: "농업법인 설립 혜택을 설명하는 강의 장면", width: 1800, height: 1013 },
      { src: "/images/activities/farm-manager/certification.webp", alt: "여성기업인증 신청방법을 설명하는 김태훈 행정사", caption: "여성기업인증 신청 자료와 절차 안내", width: 1800, height: 1013 },
      { src: "/images/activities/farm-manager/banner-portrait.webp", alt: "농업전문경영인 육성교육 현수막 앞에 선 김태훈 행정사", caption: "농업전문경영인 육성교육 현장", width: 1800, height: 1013 },
    ],
  },
  {
    slug: "yecheon-4h-capacity-building",
    title: "예천군 4-H회 역량강화교육",
    category: "농업경영 교육",
    summary: "청년농업인의 사업계획과 지원사업 탐색에 필요한 행정 실무를 화면과 사례 중심으로 안내한 교육 현장입니다.",
    overview: "농업경영에 필요한 사업계획서 작성, 농업법인 설립, 지역 지원사업 확인 방법을 중심으로 강의를 진행했습니다. 교육명과 일정·장소는 사진 속 현수막과 일정표에서 확인했습니다.",
    period: "2026. 9. 2. ~ 9. 3. (교육 일정표 표기)",
    sourceLabel: "예천군농업기술센터 (강의 자료 표기)",
    venue: "용문면 금당실마을 (현수막 표기)",
    topics: [
      "농업법인 설립 절차와 준비 흐름",
      "사업계획서를 작성하는 이유와 구성 방법",
      "관할지역 농촌지원·복합산업화 지원사업 확인 방법",
      "AI 기반 사업계획서와 보조금 신청서 작성 실습",
    ],
    relatedService: "/services/agriculture-consulting",
    images: [
      { src: "/images/activities/4h/title-scene.webp", alt: "예천군 4-H 역량강화 교육 제목 화면 옆의 김태훈 행정사", caption: "예천군 4-H회 역량강화교육 강의 시작 장면", width: 1800, height: 1013, position: "center 45%" },
      { src: "/images/activities/4h/business-plan.webp", alt: "사업계획서 작성 이유를 설명하는 김태훈 행정사", caption: "사업계획서의 역할과 작성 이유 안내", width: 1800, height: 1013 },
      { src: "/images/activities/4h/audience.webp", alt: "예천군 4-H 회원들이 농업 지원사업 강의를 듣는 모습", caption: "교육생과 함께한 농업 지원사업 강의 현장", width: 1800, height: 1013 },
      { src: "/images/activities/4h/support-search.webp", alt: "예천군 농업 지원사업 검색 방법을 설명하는 김태훈 행정사", caption: "관할지역 지원사업을 직접 확인하는 방법 안내", width: 1800, height: 1013 },
      { src: "/images/activities/4h/profile-scene.webp", alt: "강의 소개 화면 앞에 선 김태훈 행정사", caption: "교육 현장에서 전문 분야를 소개하는 모습", width: 1800, height: 1013 },
    ],
  },
  {
    slug: "senior-smartphone-ai",
    title: "시니어 스마트폰 AI 활용교육",
    category: "교육 활동",
    summary: "스마트폰과 AI를 처음 접하는 학습자도 안전하고 쉽게 활용할 수 있도록 실습 중심으로 진행한 교육입니다.",
    overview: "AI의 기본 개념부터 개인정보를 구분하는 방법, 스마트폰에서 활용할 때 주의할 점을 화면과 퀴즈로 설명했습니다. 교육 장소는 사진만으로 단정하지 않고 공개 화면에서 생략했습니다.",
    period: "2026. 9. 3. ~ 9. 11. (현수막 표기)",
    sourceLabel: "예천군농업기술센터 (현수막 표기)",
    topics: [
      "퀴즈로 이해하는 AI의 기본 개념",
      "AI에 알려도 되는 정보와 주의해야 할 개인정보 구분",
      "스마트폰을 활용한 단계별 AI 실습",
    ],
    images: [
      { src: "/images/activities/senior-ai/classroom-wide.webp", alt: "시니어 교육생에게 스마트폰 AI 활용을 설명하는 김태훈 행정사", caption: "교육생과 함께한 스마트폰 AI 활용교육", width: 1800, height: 1013, position: "center 42%" },
      { src: "/images/activities/senior-ai/lecture-close.webp", alt: "개인정보 보호 내용을 설명하는 김태훈 행정사", caption: "AI에 입력할 정보와 주의할 정보를 구분하는 교육", width: 1800, height: 1013 },
      { src: "/images/activities/senior-ai/lecture-room.webp", alt: "AI 퀴즈 화면 앞에서 강의하는 김태훈 행정사", caption: "퀴즈를 활용해 AI 개념을 설명하는 장면", width: 1800, height: 1013 },
      { src: "/images/activities/senior-ai/banner.webp", alt: "스마트폰 AI 활용 교육 현수막 앞의 김태훈 행정사", caption: "스마트폰 AI 활용 교육 현장", width: 1800, height: 1013 },
    ],
  },
];

export const agricultureEducationActivities = educationActivities.filter((activity) => activity.category === "농업경영 교육");

export function getEducationActivity(slug: string) {
  return educationActivities.find((activity) => activity.slug === slug);
}
