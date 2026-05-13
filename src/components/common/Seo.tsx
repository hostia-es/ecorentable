import { Helmet } from "react-helmet-async";

const SITE = "https://ecorentable.lovable.app";
const BRAND = "Ecología Rentable";

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  image?: string;
  jsonLd?: object | object[];
}

/**
 * Per-route SEO head. Sets <title>, meta description, canonical, og:* and
 * optional JSON-LD. Title is auto-suffixed with the brand when not present.
 */
export default function Seo({
  title,
  description,
  path,
  type = "website",
  image = `${SITE}/og-default.jpg`,
  jsonLd,
}: SeoProps) {
  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const ldArr = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle.length > 60 ? fullTitle.slice(0, 57) + "…" : fullTitle}</title>
      <meta name="description" content={description.slice(0, 160)} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description.slice(0, 200)} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description.slice(0, 200)} />
      <meta name="twitter:image" content={image} />
      {ldArr.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}
