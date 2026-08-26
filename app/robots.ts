import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{const base=process.env.NEXT_PUBLIC_SITE_URL||"https://garden-kimtaehoon-office.vercel.app";return {rules:[{userAgent:"*",allow:"/",disallow:["/board/inquiry","/consultation","/contact"]}],sitemap:`${base}/sitemap.xml`}}
