import { serviceSeoContent } from "../data/serviceSeoContent";
import { portfolioProjects } from "../data/portfolioProjects";

export const SITE = {
  name: "Malíři v černém",
  baseUrl: "https://www.malirivcernem.cz",
  email: "info@malirivcernem.cz",
  phoneE164: "+420732333550",
  phoneDisplay: "+420 732 333 550",
  city: "Praha",
  country: "CZ",
  serviceAreas: ["Praha 1–10", "Praha-západ", "Praha-východ"],
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "18:00",
  },
  defaultOgImage:
    "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fde4c3a59dfe7452abff728cfc029c559?format=webp&width=2400&height=1260",
} as const;

const featuredRealizations = [
  {
    name: "Byt 3+kk Vinohrady",
    description: "Kompletní výmalba bytu 3+kk v Praze 2 na Vinohradech včetně oprav omítek a zakrytí interiéru.",
    path: "/realizace",
  },
  {
    name: "Kanceláře IT firmy Karlín",
    description: "Malování kanceláří v Praze 8 přes víkend s minimálním omezením provozu.",
    path: "/realizace",
  },
  {
    name: "SVJ Biskupcova 18",
    description: "Etapové malování společných prostor domu a schodiště pro SVJ v Praze 3.",
    path: "/realizace",
  },
  {
    name: "Microcement loft Holešovice",
    description: "Dekorativní stěrka a microcement v loftovém bytě v Praze 7.",
    path: "/realizace",
  },
] as const;

export type SeoPayload = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
  jsonLd?: Array<Record<string, unknown>>;
};

type ServiceSeo = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const serviceSeoMap: Record<string, ServiceSeo> = {
  "malovani-bytu": {
    slug: "malovani-bytu",
    title: "Malování bytů a pokojů v Praze",
    description:
      "Profesionální malování bytů, pokojů a rodinných domů v Praze a okolí. Zakrytí, opravy zdí, precizní výmalba i finální úklid.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fccb0003eea4f4419ae5d6485d2222ae5",
  },
  "malovani-pred-prodejem": {
    slug: "malovani-pred-prodejem",
    title: "Malování před prodejem nebo pronájmem v Praze",
    description:
      "Rychlé malování bytu či domu před prodejem nebo pronájmem v Praze. Neutrální výmalba, opravy zdí a čisté předání pro lepší prezentaci nemovitosti.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c",
  },
  "malovani-kancelari": {
    slug: "malovani-kancelari",
    title: "Malování kanceláří a firemních prostor v Praze",
    description:
      "Malování kanceláří a komerčních prostor v Praze s minimálním omezením provozu. Flexibilní termíny, rychlá realizace, čistá práce a víkendové malování.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F3026d95741854f52aaaf83680e170c34",
  },
  "komercni-objekty": {
    slug: "komercni-objekty",
    title: "Malování restaurací, penzionů a hotelů v Praze",
    description:
      "Malování restaurací, penzionů, hotelů a dalších komerčních objektů v Praze. Rychlá realizace, odolné nátěry a práce mimo provozní špičku.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F813e356566e0424cbba8f945a4b5a0bc",
  },
  "malovani-svj": {
    slug: "malovani-svj",
    title: "Malování společných prostor domu a SVJ v Praze",
    description:
      "Malování chodeb, schodišť a společných prostor bytových domů, SVJ a družstev v Praze. Etapová realizace, koordinace a čisté provedení.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2Ffe0d5ae8e8b3454e951a42634b8be26d",
  },
  "dekorativni-sterky": {
    slug: "dekorativni-sterky",
    title: "Dekorativní stěrky a microcement v Praze",
    description:
      "Dekorativní stěrky, microcement, benátský štuk a designové povrchy pro moderní interiéry v Praze. Vzorkování, návrh i profesionální aplikace.",
    image:
      "https://images.unsplash.com/photo-1719194981461-fa0ec450999e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
};

export const SERVICE_SLUGS = Object.keys(serviceSeoMap);

function absoluteUrl(path: string) {
  return `${SITE.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE.baseUrl}/#business`,
    name: SITE.name,
    url: SITE.baseUrl,
    image: SITE.defaultOgImage,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.openingHours.days,
      opens: SITE.openingHours.opens,
      closes: SITE.openingHours.closes,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phoneE164,
        email: SITE.email,
        availableLanguage: ["cs", "en"],
        areaServed: "CZ",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Malířské služby",
      itemListElement: Object.values(serviceSeoMap).map((service) => ({
        "@type": "OfferCatalog",
        name: service.title,
        url: absoluteUrl(`/sluzby/${service.slug}`),
      })),
    },
    priceRange: "$$",
  };
}

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.baseUrl}/#website`,
    url: SITE.baseUrl,
    name: SITE.name,
    inLanguage: "cs-CZ",
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${SITE.baseUrl}/#business`,
    },
  };
}

function webPageSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "cs-CZ",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.baseUrl}/#website`,
    },
  };
}

function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function serviceSchema(service: ServiceSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    image: service.image,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.baseUrl}/#business`,
      name: SITE.name,
      telephone: SITE.phoneE164,
      email: SITE.email,
    },
    serviceType: service.title,
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
    url: absoluteUrl(`/sluzby/${service.slug}`),
  };
}

function collectionPageSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "cs-CZ",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.baseUrl}/#website`,
    },
  };
}

function itemListSchema(name: string, items: ReadonlyArray<{ name: string; description: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
      },
    })),
  };
}

function articleSchema(title: string, description: string, path: string, image: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    inLanguage: "cs-CZ",
  };
}

function homeSeo(): SeoPayload {
  const homeFaq = [
    {
      question: "Kolik stojí malování bytu v Praze?",
      answer:
        "Cena malování bytu v Praze závisí na velikosti prostoru, stavu zdí, výšce stropu a doplňkových službách. Orientační cenu si můžete spočítat v online kalkulačce.",
    },
    {
      question: "Děláte i malování kanceláří a společných prostor domu?",
      answer:
        "Ano. Realizujeme malování kanceláří, komerčních prostor, restaurací, penzionů i společných prostor bytových domů a SVJ v Praze a okolí.",
    },
    {
      question: "Zajišťujete i zakrytí, opravy zdí a úklid po malování?",
      answer:
        "Ano, podle rozsahu zakázky zajistíme zakrytí nábytku a podlah, opravy zdí, přípravu povrchů i finální úklid po malování.",
    },
  ];

  return {
    title: "Malování bytů, pokojů a kanceláří Praha | Malíři v černém",
    description:
      "Malování bytů, pokojů, kanceláří a společných prostor v Praze a okolí. Opravy zdí, dekorativní stěrky, online kalkulačka ceny a rychlá poptávka.",
    path: "/",
    keywords: [
      "malování bytů Praha",
      "malování pokojů Praha",
      "malíř pokojů Praha",
      "malování kanceláří Praha",
      "dekorativní stěrky Praha",
    ],
    image: SITE.defaultOgImage,
    jsonLd: [
      businessSchema(),
      webSiteSchema(),
      webPageSchema("Domů", "/", "Úvodní stránka firmy Malíři v černém"),
      faqSchema(homeFaq),
    ],
  };
}

function staticPageSeo(pathname: string): SeoPayload | null {
  const servicesFaq = [
    {
      question: "Jak vybrat správnou službu, když si nejsem jistý?",
      answer:
        "Pokud si nejste jistí typem služby, doporučujeme využít online kalkulačku nebo nás kontaktovat. Na základě fotek či krátkého popisu doporučíme vhodný postup a připravíme orientační nacenění.",
    },
    {
      question: "Jsou v ceně malování zahrnuté přípravné práce a úklid?",
      answer:
        "Rozsah přípravných prací a úklidu záleží na konkrétní zakázce a stavu prostoru. Ve finální nabídce vždy jasně uvádíme, co je součástí ceny, aby nevznikly nejasnosti.",
    },
    {
      question: "Realizujete zakázky i pro firmy a SVJ?",
      answer:
        "Ano, realizujeme i komerční zakázky, kanceláře, společné prostory domů a projekty pro SVJ či developery včetně etapového postupu a koordinace.",
    },
  ] as const;

  const calculatorFaq = [
    {
      question: "Je cena z kalkulačky finální?",
      answer:
        "Cena z kalkulačky je orientační. Přesnou cenu potvrzujeme po upřesnění detailů a případné osobní prohlídce prostoru.",
    },
    {
      question: "Za jak dlouho se po odeslání poptávky ozvete?",
      answer:
        "Na poptávky reagujeme co nejdříve, obvykle telefonicky nebo emailem. Ve většině případů nejpozději do 24 hodin.",
    },
    {
      question: "Co když se poptávka přes formulář neodešle?",
      answer:
        "Na stránce je k dispozici záložní kontakt. Můžete rovnou zavolat nebo odeslat email s předvyplněnou poptávkou.",
    },
  ] as const;

  const descriptions = {
    sluzby:
      "Kompletní přehled malířských služeb v Praze a okolí: malování bytů, pokojů, kanceláří, SVJ, dekorativní stěrky a komerční objekty.",
    realizace:
      "Reference a ukázky realizací malířských prací v Praze. Prohlédněte si dokončené projekty v bytech, kancelářích, SVJ a komerčních objektech.",
    kalkulacka:
      "Spočítejte si orientační cenu malování online a odešlete poptávku během pár minut. Rychlé nacenění malování bytu, pokoje nebo kanceláře v Praze.",
    oNas:
      "Poznejte tým Malíři v černém. Firma z Prahy s důrazem na precizní malířské práce, čistotu, férovou komunikaci a rychlé termíny.",
    kontakt:
      "Kontaktujte Malíře v černém. Telefon, email a kontaktní formulář pro poptávku malování bytů, pokojů, kanceláří a stěrek v Praze a okolí.",
    ochranaOsobnichUdaju:
      "Informace o zpracování osobních údajů při poptávce malířských služeb a komunikaci se společností Malíři v černém.",
    obchodniPodminky:
      "Obchodní podmínky a základní pravidla spolupráce pro malířské práce poskytované společností Malíři v černém.",
  } as const;

  const pages: Record<string, SeoPayload> = {
    "/sluzby": {
      title: "Malířské služby Praha | Byty, kanceláře, SVJ a stěrky",
      description: descriptions.sluzby,
      path: "/sluzby",
      keywords: ["malířské služby Praha", "malování bytů Praha", "malování kanceláří Praha", "malování SVJ Praha"],
      jsonLd: [
        businessSchema(),
        webPageSchema("Služby", "/sluzby", descriptions.sluzby),
        faqSchema([...servicesFaq]),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Služby", path: "/sluzby" },
        ]),
      ],
    },
    "/realizace": {
      title: "Reference malování Praha | Ukázky realizací",
      description: descriptions.realizace,
      path: "/realizace",
      keywords: ["reference malování Praha", "ukázky realizací malování", "malování bytů Praha reference", "malování kanceláří Praha reference"],
      jsonLd: [
        businessSchema(),
        collectionPageSchema("Realizace", "/realizace", descriptions.realizace),
        webPageSchema("Realizace", "/realizace", descriptions.realizace),
        itemListSchema("Vybrané realizace", featuredRealizations),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Realizace", path: "/realizace" },
        ]),
      ],
    },
    "/kalkulacka": {
      title: "Kalkulačka malování Praha | Cena malování bytu a pokoje",
      description: descriptions.kalkulacka,
      path: "/kalkulacka",
      keywords: ["kalkulačka malování Praha", "cena malování bytu Praha", "kolik stojí malování pokoje"],
      jsonLd: [
        businessSchema(),
        webPageSchema("Kalkulačka", "/kalkulacka", descriptions.kalkulacka),
        faqSchema([...calculatorFaq]),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Kalkulačka", path: "/kalkulacka" },
        ]),
      ],
    },
    "/o-nas": {
      title: "O nás | Malíři v černém Praha",
      description: descriptions.oNas,
      path: "/o-nas",
      jsonLd: [
        businessSchema(),
        webPageSchema("O nás", "/o-nas", descriptions.oNas),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "O nás", path: "/o-nas" },
        ]),
      ],
    },
    "/kontakt": {
      title: "Kontakt | Malování bytů a kanceláří Praha",
      description: descriptions.kontakt,
      path: "/kontakt",
      keywords: ["kontakt malíř Praha", "malování bytů Praha kontakt", "malíři v černém kontakt"],
      jsonLd: [
        businessSchema(),
        webPageSchema("Kontakt", "/kontakt", descriptions.kontakt),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]),
      ],
    },
    "/ochrana-osobnich-udaju": {
      title: "Ochrana osobních údajů | Malíři v černém",
      description: descriptions.ochranaOsobnichUdaju,
      path: "/ochrana-osobnich-udaju",
      jsonLd: [
        businessSchema(),
        webPageSchema(
          "Ochrana osobních údajů",
          "/ochrana-osobnich-udaju",
          descriptions.ochranaOsobnichUdaju,
        ),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Ochrana osobních údajů", path: "/ochrana-osobnich-udaju" },
        ]),
      ],
    },
    "/obchodni-podminky": {
      title: "Obchodní podmínky | Malíři v černém",
      description: descriptions.obchodniPodminky,
      path: "/obchodni-podminky",
      jsonLd: [
        businessSchema(),
        webPageSchema(
          "Obchodní podmínky",
          "/obchodni-podminky",
          descriptions.obchodniPodminky,
        ),
        breadcrumbSchema([
          { name: "Domů", path: "/" },
          { name: "Obchodní podmínky", path: "/obchodni-podminky" },
        ]),
      ],
    },
  };
  return pages[pathname] ?? null;
}

function servicePageSeo(pathname: string): SeoPayload | null {
  const match = pathname.match(/^\/sluzby\/([^/]+)$/);
  if (!match) return null;
  const service = serviceSeoMap[match[1]];
  if (!service) return null;
  return {
    title: `${service.title} | Malíři v černém`,
    description: service.description,
    path: `/sluzby/${service.slug}`,
    keywords: [service.title, `${service.title} Praha`, "malířské práce Praha"],
    image: service.image,
    jsonLd: [
      businessSchema(),
      webPageSchema(service.title, `/sluzby/${service.slug}`, service.description),
      breadcrumbSchema([
        { name: "Domů", path: "/" },
        { name: "Služby", path: "/sluzby" },
        { name: service.title, path: `/sluzby/${service.slug}` },
      ]),
      serviceSchema(service),
      ...(serviceSeoContent[service.slug]
        ? [faqSchema(serviceSeoContent[service.slug].faq.map((item) => ({
            question: item.q,
            answer: item.a,
          })))]
        : []),
    ],
  };
}

function portfolioDetailSeo(pathname: string): SeoPayload | null {
  const match = pathname.match(/^\/realizace\/([^/]+)$/);
  if (!match) return null;

  const project = portfolioProjects.find((item) => item.slug === match[1]);
  if (!project) return null;

  const title = `${project.title} | Reference malování ${project.location}`;
  const description = `${project.desc} Lokalita ${project.location}, plocha ${project.area}, doba realizace ${project.duration}.`;
  const path = `/realizace/${project.slug}`;

  return {
    title,
    description,
    path,
    keywords: [
      `${project.title} reference`,
      `malování ${project.location}`,
      `${project.relatedServiceLabel} reference`,
      "reference malování Praha",
    ],
    image: project.cover,
    jsonLd: [
      businessSchema(),
      webPageSchema(title, path, description),
      breadcrumbSchema([
        { name: "Domů", path: "/" },
        { name: "Realizace", path: "/realizace" },
        { name: project.title, path },
      ]),
      articleSchema(title, description, path, project.cover),
    ],
  };
}

export function resolveSeo(pathname: string): SeoPayload {
  if (pathname === "/") return homeSeo();
  const servicePage = servicePageSeo(pathname);
  if (servicePage) return servicePage;
  const portfolioPage = portfolioDetailSeo(pathname);
  if (portfolioPage) return portfolioPage;
  const staticPage = staticPageSeo(pathname);
  if (staticPage) return staticPage;

  return {
    title: "404 | Stránka nebyla nalezena | Malíři v černém",
    description:
      "Požadovaná stránka nebyla nalezena. Pokračujte na hlavní stránku Malíři v černém nebo nás kontaktujte.",
    path: pathname || "/",
    noindex: true,
    jsonLd: [businessSchema()],
  };
}
