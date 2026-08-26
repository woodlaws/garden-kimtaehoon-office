"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/site";

export function BlogFilter({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const categories = ["전체", ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = useMemo(() => posts.filter(p => (category === "전체" || p.category === category) && `${p.title} ${p.summary}`.includes(query)), [posts, query, category]);
  return <>
    <div className="filter-tools"><label className="search-box"><Search/><span className="sr-only">블로그 검색</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="궁금한 행정정보를 검색하세요"/></label>
      <div className="chips" aria-label="카테고리 필터">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={c === category ? "selected" : ""}>{c}</button>)}</div>
    </div>
    <div className="blog-grid">{filtered.map((post, i) => <article className="blog-card" key={post.slug}><div className={`thumb thumb-${(i % 3) + 1}`}><span>{post.category}</span></div><div className="card-body"><p className="meta">{post.category} · {post.date}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.summary}</p><Link className="text-link" href={`/blog/${post.slug}`}>글 읽기 →</Link></div></article>)}</div>
    {!filtered.length && <div className="empty-state"><h2>검색 결과가 없습니다.</h2><p>다른 키워드나 카테고리를 선택해 주세요.</p></div>}
  </>;
}
