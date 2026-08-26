import type { Metadata } from "next";
import { BlogFilter } from "@/components/Filters";
import { Breadcrumbs, PageHero } from "@/components/Common";
import { blogPosts } from "@/data/site";
export const metadata:Metadata={title:"행정 정보 블로그",description:"인허가, 행정심판, 출입국·비자와 생활 행정에 필요한 실무 정보를 쉽게 설명합니다."};
export default function BlogPage(){return <><PageHero eyebrow="ADMINISTRATIVE INSIGHTS" title="검색하고, 이해하고, 준비할 수 있는 행정 정보" description="복잡한 행정절차에서 놓치기 쉬운 기준과 준비사항을 질문 중심으로 설명합니다."/><Breadcrumbs items={[{label:"블로그"}]}/><section className="section soft"><div className="shell"><BlogFilter posts={blogPosts}/><nav className="pagination" aria-label="페이지 이동"><button disabled>이전</button><b>1</b><button disabled>다음</button></nav></div></section></>}
