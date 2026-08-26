import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header, MobileActions } from "@/components/SiteChrome";
import { siteConfig } from "@/data/site";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://kim-taehoon-administrative-office.geosangbruce.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "김태훈 행정사 | 가든 행정사사무소", template: "%s | 김태훈 행정사" },
  description: "복잡한 행정절차를 정확히 진단하고 준비사항과 진행 과정을 알기 쉽게 안내합니다.",
  openGraph: { title: "김태훈 행정사 | 가든 행정사사무소", description: "복잡한 행정절차, 정확한 진단부터 차근차근 함께합니다.", type: "website", locale: "ko_KR", images: [{ url: "/og.png", width: 1792, height: 938, alt: "김태훈 행정사 홈페이지 안내" }] },
  twitter: { card: "summary_large_image", title: "김태훈 행정사", description: "복잡한 행정절차를 이해하기 쉽게 안내합니다.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: `${siteConfig.representative} 홈페이지`, url: siteOrigin },
      { "@type": "Person", name: siteConfig.representative },
      { "@type": "ProfessionalService", name: siteConfig.name, url: siteOrigin },
    ],
  };
  return <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/><a className="skip-link" href="#main">본문 바로가기</a><Header/><main id="main">{children}</main><Footer/><MobileActions/></body></html>;
}
