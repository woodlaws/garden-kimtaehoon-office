import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{const base=process.env.NEXT_PUBLIC_SITE_URL||"https://kim-taehoon-administrative-office.geosangbruce.chatgpt.site";return {rules:[{userAgent:"*",allow:"/",disallow:["/board/inquiry","/consultation"]}],sitemap:`${base}/sitemap.xml`}}
