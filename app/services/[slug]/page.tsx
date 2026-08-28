import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AlertCircle, CheckCircle2, FileText, ListChecks } from "lucide-react";
import { Breadcrumbs, CTA, PageHero } from "@/components/Common";
import { ImmigrationVisaDetail } from "@/components/ImmigrationVisaDetail";
import { PermitDetail } from "@/components/PermitDetail";
import { AppealDetail } from "@/components/AppealDetail";
import { CorporateDetail } from "@/components/CorporateDetail";
import { DocumentsDetail } from "@/components/DocumentsDetail";
import { blogPosts, faqs, services } from "@/data/site";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

export function generateStaticParams(){return services.map(service=>({slug:service.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  if(slug==="investigation-documents"||slug==="real-estate")return {robots:{index:false,follow:true}};
  const service=services.find(item=>item.slug===slug);
  if(!service)return {title:"업무 안내",robots:{index:false,follow:false}};
  const label=slug==="immigration-visa"?"출입국·비자 행정 상담":slug==="permits"?"각종 인허가 행정업무":slug==="corporate"?"기업·법인 행정업무":service.title;
  return publicMetadata({title:`${label} | 김태훈 행정사`,description:service.intro,path:service.detailPath});
}
export default async function ServiceDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(slug==="investigation-documents")permanentRedirect("/services/documents");if(slug==="real-estate")permanentRedirect("/services/land-property");if(slug==="documents")return <DocumentsDetail/>;const s=services.find(v=>v.slug===slug);if(!s)notFound();if(slug==="immigration-visa")return <ImmigrationVisaDetail/>;if(slug==="permits")return <PermitDetail/>;if(slug==="appeal")return <AppealDetail/>;if(slug==="corporate")return <CorporateDetail/>;const structuredData={"@graph":[{"@type":"Service",name:s.title,description:s.intro,url:siteUrl(s.detailPath),provider:{"@type":"ProfessionalService",name:"가든 행정사사무소",url:siteUrl("/")}},breadcrumbJsonLd([{name:"홈",path:"/"},{name:"업무 분야",path:"/services"},{name:s.title,path:s.detailPath}])]};return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structuredData)}}/>
  <PageHero eyebrow="SERVICE DETAIL" title={s.title} description={s.intro}/><Breadcrumbs items={[{label:"업무 분야",href:"/services"},{label:s.title}]}/>
  <section className="section"><div className="shell detail-layout"><article className="detail-main"><section><p className="eyebrow">WHO NEEDS THIS</p><h2>이런 분들에게 필요합니다</h2><ul className="check-list">{s.audiences.map(v=><li key={v}><CheckCircle2/>{v}</li>)}</ul></section><section><p className="eyebrow">SUPPORT</p><h2>주요 지원 업무</h2><div className="number-list">{s.supports.map((v,i)=><div key={v}><span>{String(i+1).padStart(2,"0")}</span><p>{v}</p></div>)}</div></section><section><p className="eyebrow">DOCUMENTS</p><h2>상담 전에 준비하면 좋은 자료</h2><ul className="document-list">{s.documents.map(v=><li key={v}><FileText/>{v}</li>)}</ul><p className="notice-box"><AlertCircle/>업무와 개인 상황에 따라 추가 서류가 필요할 수 있습니다. 민감한 개인정보는 공개 링크로 전달하지 마세요.</p></section><section><p className="eyebrow">PROCESS</p><h2>예상 진행 과정</h2><ol className="vertical-process"><li><b>01 상담과 자료 확인</b><p>현재 단계와 원하는 결과를 확인합니다.</p></li><li><b>02 적용 절차·요건 검토</b><p>관할, 기한, 주요 요건을 검토합니다.</p></li><li><b>03 필요서류와 범위 안내</b><p>업무 범위와 준비자료를 설명합니다.</p></li><li><b>04 서류 작성·제출 지원</b><p>동의한 범위에 따라 업무를 진행합니다.</p></li><li><b>05 보완 및 결과 안내</b><p>기관 요청과 처리 내용을 공유합니다.</p></li></ol></section><section><p className="eyebrow">FAQ</p><h2>관련 질문</h2><div className="faq-list">{faqs.slice(0,4).map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section></article>
  <aside className="detail-sidebar"><div><ListChecks/><h3>{s.title} 상담 안내</h3><p>문서의 종류와 받은 날짜, 현재 상황을 간단히 정리해 주세요.</p><Link className="button gold" href={`/contact?service=${s.consultationQuery}`}>상담 신청</Link></div><nav><strong>다른 업무 분야</strong>{services.filter(v=>v.slug!==s.slug).map(v=><Link href={v.detailPath} key={v.slug}>{v.title}<span>→</span></Link>)}</nav></aside></div></section>
  <section className="section soft"><div className="shell"><div className="split-heading"><div><p className="eyebrow">RELATED CONTENT</p><h2>함께 읽어보세요</h2></div><Link href="/blog">블로그 전체 보기 →</Link></div><div className="related-grid">{blogPosts.slice(0,3).map(p=><Link href={`/blog/${p.slug}`} key={p.slug}><small>{p.category}</small><b>{p.title}</b><span>{p.summary}</span></Link>)}</div></div></section><CTA/>
</>}
