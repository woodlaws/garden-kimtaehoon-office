import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header, MobileActions } from "@/components/SiteChrome";
import { siteConfig } from "@/data/site";
import { ogImage, siteOrigin, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "김태훈 행정사 | 가든 행정사사무소", template: "%s | 김태훈 행정사" },
  description: "복잡한 행정절차를 정확히 진단하고 준비사항과 진행 과정을 알기 쉽게 안내합니다.",
  alternates: { canonical: siteUrl("/") },
  robots: { index: true, follow: true },
  openGraph: { title: "김태훈 행정사 | 가든 행정사사무소", description: "복잡한 행정절차, 정확한 진단부터 차근차근 함께합니다.", url: siteUrl("/"), type: "website", locale: "ko_KR", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "김태훈 행정사", description: "복잡한 행정절차를 이해하기 쉽게 안내합니다.", images: [ogImage.url] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: `${siteConfig.representative} 홈페이지`, url: siteOrigin },
      { "@type": "Person", "@id": `${siteOrigin}/about#kim-taehoon`, name: siteConfig.representative, url: siteUrl("/about") },
      { "@type": "ProfessionalService", "@id": `${siteOrigin}/#office`, name: siteConfig.name, url: siteOrigin },
    ],
  };
  return <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/><a className="skip-link" href="#main">본문 바로가기</a><Header/><main id="main">{children}</main><Footer/><MobileActions/></body></html>;
}
