import type { GetServerSideProps } from "next";
import { portfolioProjects } from "@/app/data/portfolioProjects";
import { SERVICE_SLUGS, SITE } from "@/app/seo/site";

const staticPaths = [
  "/",
  "/sluzby",
  "/realizace",
  "/kalkulacka",
  "/o-nas",
  "/kontakt",
  "/ochrana-osobnich-udaju",
  "/obchodni-podminky",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createSitemap() {
  const paths = [
    ...staticPaths,
    ...SERVICE_SLUGS.map((slug) => `/sluzby/${slug}`),
    ...portfolioProjects.map((project) => `/realizace/${project.slug}`),
  ];

  const entries = paths.map((path) => {
    const priority = path === "/" ? "1.0" : path === "/kalkulacka" || path === "/kontakt" ? "0.9" : "0.7";
    const changefreq = path === "/" || path === "/realizace" ? "weekly" : "monthly";
    return `  <url>\n    <loc>${escapeXml(`${SITE.baseUrl}${path}`)}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(createSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
