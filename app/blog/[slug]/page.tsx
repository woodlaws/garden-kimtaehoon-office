import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CTA } from "@/components/Common";
import { blogPosts, services, siteConfig } from "@/data/site";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return { title: "블로그" };
  return publicMetadata({
    title: `${post.title} | 김태훈 행정사`, description: post.summary,
    path: `/blog/${post.slug}`, openGraphType: "article",
    ...(post.thumbnail ? { image: { ...post.thumbnail, url: siteUrl(post.thumbnail.src) } } : {}),
  });
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) notFound();
  const index = blogPosts.findIndex(item => item.slug === slug);
  const prev = blogPosts[index - 1], next = blogPosts[index + 1];
  const relatedService = services.find(service => service.slug === post.relatedServiceSlug) || services[0];
  const checklist = post.checklist || ["받은 문서 전체와 수령일", "지금까지 제출한 서류", "사실관계를 시간순으로 정리한 메모", "원하는 처리 방향과 마감 일정"];
  const faqs = post.faq || [{ question: "이 글만으로 제 상황을 판단할 수 있나요?", answer: "이 글은 일반적인 정보입니다. 구체적인 판단은 실제 문서와 사실관계를 확인한 뒤에 가능합니다." }];
  const structuredData = {
    "@graph": [
      breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "행정 정보 블로그", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
      {
        "@type": "BlogPosting", headline: post.title, description: post.summary,
        datePublished: post.date, dateModified: post.updated, articleSection: post.category,
        author: { "@type": "Person", name: siteConfig.representative, url: siteUrl("/about") },
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteUrl() },
        mainEntityOfPage: siteUrl(`/blog/${post.slug}`), inLanguage: "ko-KR",
        ...(post.thumbnail ? { image: [siteUrl(post.thumbnail.src)] } : {}),
        ...(post.source ? { isBasedOn: post.source.url } : {}),
        ...(post.references ? { citation: post.references.map(reference => reference.url) } : {}),
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
    <article className={`blog-detail${post.source ? " sourced-article" : ""}`}>
      <div className="blog-title shell">
        <p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p>{post.summary}</p>
        <div>
          <span>{post.source ? "원문" : "작성자"} {siteConfig.representative}</span>
          <time dateTime={post.date}>{post.source ? "홈페이지 발행" : "작성"} {post.date}</time>
          {post.updated !== post.date && <time dateTime={post.updated}>수정 {post.updated}</time>}
        </div>
      </div>
      <Breadcrumbs items={[{ label: "블로그", href: "/blog" }, { label: post.title }]} />
      <div className="shell blog-body-layout">
        <aside className="toc" aria-label="글 목차">
          <strong>목차</strong>
          {post.sections.map((section, i) => <a href={`#section-${i + 1}`} key={section.title}>{i + 1}. {section.title}</a>)}
          <a href="#checklist">상담 전 체크리스트</a><a href="#faq">자주 묻는 질문</a>
        </aside>
        <div className="article-body">
          <div className="key-summary">
            <strong>핵심 요약</strong>
            {post.takeaways ? <ul>{post.takeaways.map(text => <li key={text}>{text}</li>)}</ul> : <p>{post.summary} 개별 사안은 관계 법령과 사실관계에 따라 달라질 수 있습니다.</p>}
          </div>
          {post.source && <div className="article-source-note"><strong>원문과 화면 자료 안내</strong><p>{post.source.note}</p><a href={post.source.url} target="_blank" rel="noopener noreferrer">네이버 원문 보기 · {post.source.published} ↗</a></div>}
          {post.sections.map((section, i) => <section id={`section-${i + 1}`} key={section.title}>
            <h2>{i + 1}. {section.title}</h2>
            {section.body.split("\n\n").map((paragraph, j) => <p key={j}>{paragraph}</p>)}
            {section.table && <div className="article-data-table" role="region" aria-label={section.table.caption} tabIndex={0}>
              <table>
                <caption>{section.table.caption}</caption>
                <thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>}
            {!post.source && <p>관련 문서의 날짜와 전체 내용을 확인하고, 기관 안내가 있다면 제출 기한과 요구 항목을 따로 표시해 두는 것이 좋습니다.</p>}
            {section.image && <figure className="article-evidence">
              <a href={section.image.src} target="_blank" rel="noopener noreferrer" aria-label={`${section.image.alt} 크게 보기 (새 창)`}>
                <Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} sizes="(max-width: 900px) calc(100vw - 48px), 740px" />
              </a>
              <figcaption>{section.image.caption}<span>이미지를 누르면 크게 볼 수 있습니다.</span></figcaption>
            </figure>}
            {section.links && <div className="article-reference-links">{section.links.map(link => link.url.startsWith("/") ? <Link key={link.url} href={link.url}>{link.label} →</Link> : <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>}
          </section>)}
          <section id="checklist"><h2>상담 전 체크리스트</h2><ul className="checklist">{checklist.map(item => <li key={item}>{item}</li>)}</ul></section>
          <section id="faq"><h2>자주 묻는 질문</h2>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
          {post.references && <section className="article-references"><h2>공식 확인 자료</h2><ul>{post.references.map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title} ↗</a></li>)}</ul></section>}
          <div className="disclaimer">{siteConfig.notice}</div>
          {post.consultation ? <section className="article-consultation"><p className="eyebrow">김태훈 행정사 · 가든 행정사사무소</p><h2>{post.consultation.title}</h2><p>{post.consultation.body}</p><div className="button-row"><Link className="button primary" href={`/contact?service=${relatedService.consultationQuery}`}>{post.consultation.label}</Link><a className="button outline" href={siteConfig.phoneHref}>전화 {siteConfig.phone}</a></div><Link className="text-link" href={relatedService.detailPath}>관련 업무 안내 →</Link></section> : <div className="related-service"><small>관련 업무 안내</small><h2>{relatedService.title}</h2><p>{relatedService.intro}</p><Link className="button outline" href={relatedService.detailPath}>업무 안내 보기</Link></div>}
          <nav className="post-nav" aria-label="다른 블로그 글">
            {prev ? <Link href={`/blog/${prev.slug}`}><small>이전 글</small><b>{prev.title}</b></Link> : <span />}
            {next && <Link href={`/blog/${next.slug}`}><small>다음 글</small><b>{next.title}</b></Link>}
          </nav>
          <Link className="text-link" href="/blog">← 블로그 목록으로</Link>
        </div>
      </div>
    </article>
    {!post.consultation && <CTA />}
  </>;
}
