"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, MessageCircle, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

const nav = [
  ["/", "홈"], ["/about", "행정사 소개"], ["/services", "업무 분야"],
  ["/cases", "업무 사례"], ["/blog", "블로그"], ["/board", "게시판"], ["/contact", "상담 신청"],
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [open]);

  return <>
    <div className="utility"><div className="shell utility-inner"><span>김태훈 행정사 · 가든 행정사사무소</span><span>정확한 진단과 책임 있는 업무 진행</span></div></div>
    <header className="header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="가든 행정사사무소 홈">
          <span className="brand-mark">庭</span><span><strong>가든 행정사사무소</strong><small>{siteConfig.representative}</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {nav.map(([href, label]) => <Link key={href} className={path === href || (href !== "/" && path.startsWith(href)) ? "active" : ""} href={href}>{label}</Link>)}
        </nav>
        <Link className="button gold header-cta" href="/contact">빠른 상담</Link>
        <button className="menu-button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="메뉴 열기"><Menu /></button>
      </div>
    </header>
    {open && <div className="menu-scrim" onClick={() => setOpen(false)}>
      <nav id="mobile-menu" className="mobile-menu" onClick={e => e.stopPropagation()} aria-label="모바일 메뉴">
        <div className="mobile-menu-head"><strong>전체 메뉴</strong><button onClick={() => setOpen(false)} aria-label="메뉴 닫기"><X /></button></div>
        {nav.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<span>→</span></Link>)}
        <p>연락처와 카카오톡 링크는 확정 후 활성화됩니다.</p>
      </nav>
    </div>}
  </>;
}

export function Footer() {
  return <footer className="footer"><div className="shell footer-grid">
    <div><div className="brand footer-brand"><span className="brand-mark">庭</span><span><strong>{siteConfig.name}</strong><small>{siteConfig.representative}</small></span></div><p>{siteConfig.notice}</p></div>
    <div><h3>바로가기</h3><div className="footer-links"><Link href="/about">행정사 소개</Link><Link href="/services">업무 분야</Link><Link href="/blog">블로그</Link><Link href="/board">게시판</Link></div></div>
    <div><h3>사무소 정보</h3><p>주소: {siteConfig.address}<br/>전화: {siteConfig.phone}<br/>이메일: {siteConfig.email}<br/>운영시간: {siteConfig.hours}</p></div>
  </div><div className="shell footer-bottom"><span>© 2026 {siteConfig.name}. All rights reserved.</span><Link href="/privacy">개인정보처리방침</Link></div></footer>;
}

export function MobileActions() {
  const path = usePathname();
  if (path === "/contact") return null;
  return <nav className="mobile-actions" aria-label="빠른 상담 메뉴">
    <span aria-disabled="true"><Phone/>전화 상담</span><span aria-disabled="true"><MessageCircle/>카카오톡</span><Link href="/contact"><FileText/>온라인 문의</Link>
  </nav>;
}
