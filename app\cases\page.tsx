import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, CTA, PageHero } from "@/components/Common";
import { caseExamples } from "@/data/site";

export const metadata:Metadata={title:"업무 사례",description:"실제 성공사례가 아닌, 업무 진행 방식을 이해하기 위한 행정업무 진행 예시입니다."};
export default function CasesPage(){return <><PageHero eyebrow="WORK EXAMPLES" title="업무가 어떻게 진행되는지 예시로 확인하세요." description="현재 게시된 내용은 실제 수임 실적이 아니라 상담과 검토 과정을 설명하기 위한 업무 진행 예시입니다."/><Breadcrumbs items={[{label:"업무 사례"}]}/><section className="section"><div className="shell"><div className="sample-notice"><strong>업무 진행 예시 안내</strong><p>의뢰인이나 실제 사건을 바탕으로 한 성공사례가 아닙니다. 실제 자료가 확보되면 개인정보를 제거하고 확인된 내용으로 교체해 주세요.</p></div><div className="case-list">{caseExamples.map((c,i)=><article key={c.slug}><span>{String(i+1).padStart(2,"0")}</span><div><small>{c.status} · {c.category}</small><h2><Link href={`/cases/${c.slug}`}>{c.title}</Link></h2><p>{c.issue}</p></div><Link href={`/cases/${c.slug}`} aria-label={`${c.title} 보기`}><ArrowRight/></Link></article>)}</div></div></section><CTA/></>}
