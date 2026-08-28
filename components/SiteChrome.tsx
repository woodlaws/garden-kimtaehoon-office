"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, MessageCircle, FileText, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";

const nav = [
  ["/", "홈"], ["/about", "행정사 소개"], ["/services", "업무 분야"],
  ["/cases", "업무 사례"], ["/blog", "블로그"], ["/board", "게시판"], ["/contact", "상담 신청"],
];

const serviceNav = [
  ["/services", "업무 분야 전체보기"],
  ["/services/immigration-visa", "출입국·비자"],
  ["/services/permits", "각종 인허가"],
  ["/services/appeal", "행정심판·행정처분 구제"],
  ["/services/corporate", "기업·법인 행정"],
  ["/services/land-property", "부동산 행정"],
  ["/services/documents", "사실조사·내용증명·행정서류"],
] as const;

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMobileMenu();
      setServicesOpen(false);
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [open]);

  return <>
    <div className="utility"><div className="shell utility-inner"><span>김태훈 행정사 · 가든 행정사사무소</span><span>정확한 진단과 책임 있는 업무 진행</span></div></div>
    <header className="header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="가든 행정사사무소 홈">
          <span className="brand-mark">庭</span><span><strong>가든 행정사사무소</strong><small>{siteConfig.representative}</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {nav.map(([href, label]) => href === "/services" ? (
            <div
              className={`desktop-nav-item has-submenu${servicesOpen ? " open" : ""}`}
              key={href}
              ref={servicesRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onFocus={() => setServicesOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setServicesOpen(false);
                  servicesLinkRef.current?.focus();
                }
              }}
            >
              <Link ref={servicesLinkRef} className={`desktop-nav-link${path.startsWith("/services") ? " active" : ""}`} href="/services" aria-haspopup="true" aria-expanded={servicesOpen} aria-controls="desktop-services-menu">
                업무 분야 <ChevronDown aria-hidden="true" />
              </Link>
              {servicesOpen && <div id="desktop-services-menu" className="services-dropdown" aria-label="업무 분야 하위 메뉴">
                {serviceNav.map(([serviceHref, serviceLabel]) => {
                  const active = path === serviceHref || (serviceHref === "/services/land-property" && path === "/services/real-estate");
                  return <Link key={serviceHref} href={serviceHref} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{serviceLabel}<span aria-hidden="true">→</span></Link>;
                })}
              </div>}
            </div>
          ) : <Link key={href} className={path === href || (href !== "/" && path.startsWith(href)) ? "active" : ""} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>)}
        </nav>
        <Link className="button gold header-cta" href="/contact">빠른 상담</Link>
        <button className="menu-button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="메뉴 열기"><Menu /></button>
      </div>
    </header>
    {open && <div className="menu-scrim" onClick={closeMobileMenu}>
      <nav id="mobile-menu" className="mobile-menu" onClick={e => e.stopPropagation()} aria-label="모바일 메뉴">
        <div className="mobile-menu-head"><strong>전체 메뉴</strong><button onClick={closeMobileMenu} aria-label="메뉴 닫기"><X /></button></div>
        {nav.map(([href, label]) => href === "/services" ? (
          <div className={`mobile-services${path.startsWith("/services") ? " active" : ""}`} key={href}>
            <button type="button" className="mobile-services-toggle" onClick={() => setMobileServicesOpen(value => !value)} aria-haspopup="true" aria-expanded={mobileServicesOpen} aria-controls="mobile-services-menu">
              <span>업무 분야</span><ChevronDown aria-hidden="true" />
            </button>
            {mobileServicesOpen && <div id="mobile-services-menu" className="mobile-services-submenu">
              {serviceNav.map(([serviceHref, serviceLabel]) => {
                const active = path === serviceHref || (serviceHref === "/services/land-property" && path === "/services/real-estate");
                return <Link key={serviceHref} href={serviceHref} onClick={closeMobileMenu} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{serviceLabel}<span aria-hidden="true">→</span></Link>;
              })}
            </div>}
          </div>
        ) : <Link key={href} href={href} onClick={closeMobileMenu} className={path === href || (href !== "/" && path.startsWith(href)) ? "active" : ""} aria-current={path === href ? "page" : undefined}>{label}<span aria-hidden="true">→</span></Link>)}
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
