"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

const mapQuery = encodeURIComponent("서울 강남구 논현로2길 60 세화빌딩");

export function OfficeLocation() {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(siteConfig.address);
      setCopyStatus("주소가 복사되었습니다");
    } catch {
      setCopyStatus("복사하지 못했습니다. 위 주소를 선택해 복사해 주세요.");
    }
  }

  return <section className="section location" id="location">
    <div className="shell">
      <div className="section-heading center"><p className="eyebrow">LOCATION</p><h2>오시는 길</h2></div>
      <div className="location-card office-location-card">
        <div className="office-location-info">
          <h3>{siteConfig.name}</h3>
          <p><b>주소</b> {siteConfig.address}</p>
          <p><b>전화</b> <a href={siteConfig.phoneHref}>{siteConfig.phone}</a></p>
          <p><b>운영시간</b> {siteConfig.hours}</p>
        </div>
        <div className="office-location-map">
          <div className="office-map-preview" aria-label="사무실 위치 안내">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <strong>세화빌딩 401호</strong>
            <p>서울 강남구 논현로2길 60</p>
            <span>아래 지도에서 위치와 길찾기를 확인하세요.</span>
          </div>
        </div>
        <div className="office-location-actions">
          <div className="button-row">
            <a className="button primary" href={`https://map.naver.com/p/search/${mapQuery}`} target="_blank" rel="noopener noreferrer">네이버지도에서 보기</a>
            <a className="button outline" href={`https://map.kakao.com/?q=${mapQuery}`} target="_blank" rel="noopener noreferrer">카카오맵에서 보기</a>
            <button className="button gold" type="button" onClick={copyAddress}>주소 복사</button>
          </div>
          <p className="office-copy-status" role="status" aria-live="polite">{copyStatus}</p>
        </div>
      </div>
    </div>
  </section>;
}
