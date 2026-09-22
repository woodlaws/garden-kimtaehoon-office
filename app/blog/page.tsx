import type { Metadata } from "next";
import { BlogFilter } from "@/components/Filters";
import { Breadcrumbs, PageHero } from "@/components/Common";
import { blogPosts } from "@/data/site";
import { breadcrumbJsonLd, jsonLd, publicMetadata } from "@/lib/site";
export const metadata:Metadata=publicMetadata({title:"행정 정보 블로그 | 김태훈 행정사",description:"농업 경영 컨설팅, 청년농업인 지원사업, 주류사업, 인허가와 행정심판에 필요한 실무 정보를 쉽게 설명합니다.",path:"/blog"});
export default function BlogPage(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbJsonLd([{name:"홈",path:"/"},{name:"행정 정보 블로그",path:"/blog"}]))}}/><PageHero eyebrow="ADMINISTRATIVE INSIGHTS" title="검색하고, 이해하고, 준비할 수 있는 행정 정보" description="복잡한 행정절차에서 놓치기 쉬운 기준과 준비사항을 질문 중심으로 설명합니다."/><Breadcrumbs items={[{label:"블로그"}]}/><section className="section soft"><div className="shell"><BlogFilter posts={blogPosts.map(({slug,category,title,summary,date,thumbnail})=>({slug,category,title,summary,date,thumbnail}))}/><nav className="pagination" aria-label="페이지 이동"><button disabled>이전</button><b>1</b><button disabled>다음</button></nav></div></section></>}

