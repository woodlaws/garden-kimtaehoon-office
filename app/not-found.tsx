import Link from "next/link";
export default function NotFound(){return <section className="not-found"><div><span>404</span><h1>요청한 페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p><div className="button-row"><Link className="button primary" href="/">홈으로 이동</Link><Link className="button outline" href="/services">업무 분야 보기</Link></div></div></section>}
