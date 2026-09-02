import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CoreServiceDetail } from "@/components/CoreServiceDetail";
import { coreServices } from "@/data/core-services";
import { breadcrumbJsonLd, jsonLd, publicMetadata, siteUrl } from "@/lib/site";

const legacyRedirects: Record<string, string> = {
  corporate: "/services/business-certification",
  permits: "/services/business-certification",
  appeal: "/services/administrative-appeal",
  "immigration-visa": "/services",
  "land-property": "/services",
  "real-estate": "/services",
  documents: "/services",
  "investigation-documents": "/services",
};

export function generateStaticParams() {
  return coreServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (legacyRedirects[slug]) return { robots: { index: false, follow: true } };
  const service = coreServices.find((item) => item.slug === slug);
  if (!service) return { title: "업무 안내", robots: { index: false, follow: false } };
  return publicMetadata({ title: service.metaTitle, description: service.metaDescription, path: service.detailPath });
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (legacyRedirects[slug]) permanentRedirect(legacyRedirects[slug]);
  const service = coreServices.find((item) => item.slug === slug);
  if (!service) notFound();

  const structuredData = {
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        url: siteUrl(service.detailPath),
        provider: { "@type": "ProfessionalService", name: "가든 행정사사무소", url: siteUrl("/") },
      },
      breadcrumbJsonLd([
        { name: "홈", path: "/" },
        { name: "업무 분야", path: "/services" },
        { name: service.title, path: service.detailPath },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}/>
    <CoreServiceDetail service={service}/>
  </>;
}
