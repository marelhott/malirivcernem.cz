import Head from "next/head";
import { useRouter } from "next/router";
import { resolveSeo, SITE } from "../app/seo/site";

function normalizePath(asPath: string) {
  const path = asPath.split("#")[0].split("?")[0] || "/";
  return path === "" ? "/" : path;
}

export default function NextSeoHead() {
  const router = useRouter();
  const path = normalizePath(router.asPath || router.pathname || "/");
  const seo = resolveSeo(path);
  const canonical = `${SITE.baseUrl}${seo.path}`;
  const image = seo.image || SITE.defaultOgImage;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords?.length ? <meta name="keywords" content={seo.keywords.join(", ")} /> : null}
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE.name} />
      <meta name="geo.region" content="CZ-10" />
      <meta name="geo.placename" content={SITE.city} />
      <meta name="theme-color" content="#111111" />
      <meta name="language" content="cs" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />
      <link rel="preconnect" href="https://cdn.builder.io" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="dns-prefetch" href="https://cdn.builder.io" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.pexels.com" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="cs-CZ" href={canonical} />
      <link rel="alternate" hrefLang="cs" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      {seo.jsonLd?.map((item, idx) => (
        <script
          key={`jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
