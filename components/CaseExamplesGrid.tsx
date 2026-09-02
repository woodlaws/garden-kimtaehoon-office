"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { caseCategories, type CaseExample } from "@/data/case-examples";

export function CaseExamplesGrid({ items }: { items: CaseExample[] }) {
  const [category, setCategory] = useState("all");
  const visible = category === "all" ? items : items.filter(item => item.category === category);
  return <>
    <div className="cases-filter" role="toolbar" aria-label="업무 분야별 사례 필터">
      {caseCategories.map(item => <button type="button" key={item.value} aria-pressed={category === item.value} onClick={() => setCategory(item.value)}>{item.label}</button>)}
    </div>
    <p className="cases-count" aria-live="polite">총 {visible.length}개의 업무사례</p>
    <div className="cases-card-grid">{visible.map(item => <article key={item.id}>
      <Link href={`/cases/${item.slug}`} aria-label={`${item.title} 상세 보기`}>
        <div className="cases-card-meta"><span>{item.actualCaseVerified ? "업무사례" : "실무안내"}</span><small>{item.categoryLabel}</small></div>
        <h2>{item.title}</h2><p>{item.summary}</p>
        <ul>{item.similarChecks.slice(0, 3).map(issue => <li key={issue}><Check/>{issue}</li>)}</ul>
        <strong>사례 상세 보기 <ArrowRight/></strong>
      </Link>
    </article>)}</div>
  </>;
}
