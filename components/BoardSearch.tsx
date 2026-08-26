"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export function FAQSearch({items}:{items:readonly (readonly [string,string])[]}){const[q,setQ]=useState("");const filtered=items.filter(([a,b])=>`${a} ${b}`.includes(q));return <><label className="search-box board-search"><Search/><span className="sr-only">질문 검색</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="질문을 검색하세요"/></label><div className="faq-list board-faq">{filtered.map(([a,b])=><details key={a}><summary>{a}<span>＋</span></summary><p>{b}</p></details>)}</div>{!filtered.length&&<div className="empty-state"><b>일치하는 질문이 없습니다.</b></div>}</>}
