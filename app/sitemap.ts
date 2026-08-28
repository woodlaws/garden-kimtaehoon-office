import type { MetadataRoute } from "next";
import { blogPosts, services } from "@/data/site";
import { publishedCaseExamples } from "@/data/case-examples";
import { siteUrl } from "@/lib/site";

const staticPages = [
  { path: "/", modified: "2026-08-28", priority: 1 },
  { path: "/about", modified: "2026-08-28", priority: .8 },
  { path: "/services", modified: "2026-08-28", priority: .9 },
  { path: "/cases", modified: "2026-08-27", priority: .7 },
  { path: "/blog", modified: "2026-08-20", priority: .8 },
  { path: "/board", modified: "2026-08-20", priority: .6 },
  { path: "/board/notices", modified: "2026-08-20", priority: .6 },
  { path: "/board/faq", modified: "2026-08-27", priority: .6 },
  { path: "/privacy", modified: "2026-08-27", priority: .4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map(page => ({ url: siteUrl(page.path), lastModified: new Date(page.modified), changeFrequency: "weekly" as const, priority: page.priority })),
    ...services.map(service => ({ url: siteUrl(service.detailPath), lastModified: new Date("2026-08-28"), changeFrequency: "monthly" as const, priority: .8 })),
    ...publishedCaseExamples.map(item => ({ url: siteUrl(`/cases/${item.slug}`), lastModified: new Date(item.updatedAt), changeFrequency: "monthly" as const, priority: .6 })),
    ...blogPosts.map(post => ({ url: siteUrl(`/blog/${post.slug}`), lastModified: new Date(post.updated), changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
