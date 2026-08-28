import type { Metadata } from "next";

export const DEFAULT_SITE_ORIGIN = "https://garden-kimtaehoon-office.vercel.app";
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_ORIGIN).replace(/\/+$/, "");
export const siteUrl = (path = "/") => `${siteOrigin}${path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`}`;
export const ogImage = { url: siteUrl("/og.png"), width: 1792, height: 938, alt: "김태훈 행정사 홈페이지 안내" } as const;

export function publicMetadata({ title, description, path, index = true }: { title: string; description: string; path: string; index?: boolean }): Metadata {
  const url = siteUrl(path);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url }, robots: { index, follow: true },
    openGraph: { title, description, url, type: "website", locale: "ko_KR", images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return { "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: siteUrl(item.path) })) };
}

export function jsonLd(value: unknown) {
  return JSON.stringify({ "@context": "https://schema.org", ...(value as object) }).replace(/</g, "\\u003c");
}
