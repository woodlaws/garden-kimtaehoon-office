"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { CaseEvidence } from "@/data/case-examples";

export function CaseEvidenceGallery({ items }: { items: CaseEvidence[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<CaseEvidence | null>(null);
  if (!items.length) return null;

  const open = (item: CaseEvidence) => {
    setSelected(item);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  return <section className="case-evidence-section">
    <p className="eyebrow">EVIDENCE</p><h2>업무 증빙자료</h2>
    <div className="case-evidence-grid">{items.map((item) => <figure key={item.src}>
      <button type="button" onClick={() => open(item)} aria-label={`${item.alt} 확대 보기`}><Image src={item.src} width={item.width} height={item.height} sizes="(max-width: 520px) 100vw, (max-width: 768px) 50vw, 33vw" alt={item.alt}/></button>
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>)}</div>
    <dialog ref={dialogRef} className="case-evidence-dialog" onClose={() => setSelected(null)}>
      <button type="button" className="case-evidence-close" onClick={() => dialogRef.current?.close()} aria-label="확대 이미지 닫기"><X/></button>
      {selected && <figure><Image src={selected.src} width={selected.width} height={selected.height} sizes="100vw" alt={selected.alt}/><figcaption>{selected.caption}</figcaption></figure>}
    </dialog>
  </section>;
}
