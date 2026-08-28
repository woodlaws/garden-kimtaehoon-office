import type {Metadata} from "next";
import { permanentRedirect } from "next/navigation";
export const metadata:Metadata={title:"상담 신청",description:"행정업무 상담을 위해 현재 상황과 관련 자료를 정리해 주세요.",robots:{index:false,follow:true}};
export default function ConsultationPage(){permanentRedirect("/contact")}
