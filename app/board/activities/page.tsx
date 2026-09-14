import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/Common";
import { educationActivities } from "@/data/activities";
import { breadcrumbJsonLd, jsonLd, publicMetadata } from "@/lib/site";

export const metadata: Metadata = publicMetadata({
  title: "교육·강의 활동 | 가든 행정사사무소",
  description: "김태훈 행정사의 농업경영 교육과 스마트폰 AI 활용교육 현장을 사진과 함께 소개합니다.",
  path: "/board/activities",
});

export default function ActivitiesPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "게시판", path: "/board" }, { name: "교육·강의 활동", path: "/board/activities" }])) }} />
    <PageHero eyebrow="EDUCATION & FIELD" title="교육·강의 활동" description="농업경영 현장과 생활 속 AI 교육에서 직접 만나 나눈 내용을 소개합니다." />
    <Breadcrumbs items={[{ label: "게시판", href: "/board" }, { label: "교육·강의 활동" }]} />
    <section className="section soft"><div className="shell activity-card-grid">
      {educationActivities.map((activity) => {
        const image = activity.images[0];
        return <article key={activity.slug} className="activity-card">
          <Link href={`/board/activities/${activity.slug}`} className="activity-card-image" aria-label={`${activity.title} 상세 보기`}>
            <Image src={image.src} alt={image.alt} fill priority={activity.slug === educationActivities[0].slug} sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 45vw, 360px" style={{ objectPosition: image.position }} />
          </Link>
          <div><span>{activity.category}</span><h2><Link href={`/board/activities/${activity.slug}`}>{activity.title}</Link></h2><p>{activity.summary}</p><Link className="text-link" href={`/board/activities/${activity.slug}`}>현장 자세히 보기 <ArrowRight /></Link></div>
        </article>;
      })}
    </div></section>
  </>;
}
