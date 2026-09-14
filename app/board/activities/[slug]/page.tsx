import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Common";
import { educationActivities, getEducationActivity } from "@/data/activities";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return educationActivities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const activity = getEducationActivity(slug);
  if (!activity) return {};
  const image = activity.images[0];
  return publicMetadata({
    title: `${activity.title} | 김태훈 행정사 교육 활동`,
    description: activity.summary,
    path: `/board/activities/${activity.slug}`,
    image: { url: siteUrl(image.src), width: image.width, height: image.height, alt: image.alt },
  });
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = getEducationActivity(slug);
  if (!activity) notFound();
  const [heroImage, ...gallery] = activity.images;
  const url = siteUrl(`/board/activities/${activity.slug}`);
  const structuredData = { "@graph": [
    breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "게시판", path: "/board" }, { name: "교육·강의 활동", path: "/board/activities" }, { name: activity.title, path: `/board/activities/${activity.slug}` }]),
    { "@type": "Article", headline: activity.title, description: activity.summary, mainEntityOfPage: url, image: siteUrl(heroImage.src), author: { "@type": "Person", name: siteConfig.representative }, publisher: { "@type": "Organization", name: siteConfig.name, url: siteUrl("/") } },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
    <section className="activity-detail-title"><div className="shell"><p className="eyebrow">{activity.category}</p><h1>{activity.title}</h1><p>{activity.summary}</p></div></section>
    <Breadcrumbs items={[{ label: "게시판", href: "/board" }, { label: "교육·강의 활동", href: "/board/activities" }, { label: activity.title }]} />
    <article className="activity-detail">
      <div className="shell activity-detail-shell">
        <figure className="activity-hero-image"><Image src={heroImage.src} alt={heroImage.alt} width={heroImage.width} height={heroImage.height} priority sizes="(max-width: 780px) calc(100vw - 32px), 1040px" /><figcaption>{heroImage.caption}</figcaption></figure>
        <section className="activity-overview"><div><p className="eyebrow">EDUCATION OVERVIEW</p><h2>교육 개요</h2><p>{activity.overview}</p></div><dl><div><dt>교육명</dt><dd>{activity.title}</dd></div><div><dt>기간</dt><dd>{activity.period}</dd></div><div><dt>자료에서 확인된 기관</dt><dd>{activity.sourceLabel}</dd></div>{activity.venue && <div><dt>장소</dt><dd><MapPin />{activity.venue}</dd></div>}</dl></section>
        <section><p className="eyebrow">CONFIRMED CONTENT</p><h2>사진에서 확인된 교육 내용</h2><ul className="activity-topic-list">{activity.topics.map((topic) => <li key={topic}><Check />{topic}</li>)}</ul></section>
        <section><p className="eyebrow">ON SITE</p><h2>현장 사진</h2><div className="activity-gallery">{gallery.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) calc(100vw - 32px), 500px" /><figcaption>{image.caption}</figcaption></figure>)}</div></section>
        {activity.relatedService && <section className="activity-related"><div><p className="eyebrow">RELATED SERVICE</p><h2>농업경영 상담이 필요하신가요?</h2><p>교육 활동은 강의 실적이며, 개별 지원사업 선정이나 인허가 결과를 의미하지 않습니다. 실제 사업 상황에 맞는 행정절차는 별도 상담을 통해 확인합니다.</p></div><Link className="button outline" href={activity.relatedService}>농업경영 종합 컨설팅 보기 <ArrowRight /></Link></section>}
      </div>
      <section className="activity-inquiry"><div className="shell"><div><p className="eyebrow">LECTURE INQUIRY</p><h2>농업경영·생활 AI 강의 문의</h2><p>교육 대상과 희망 주제를 알려주시면 현재 가능한 강의 범위를 전화로 안내해 드립니다.</p></div><a className="button gold" href={siteConfig.phoneHref}><Phone /> {siteConfig.phone} 강의 문의</a></div></section>
    </article>
  </>;
}
