
# Malíři v černém (Next.js)

Marketingový web pro malířské služby, připravený pro deploy na Vercel/Netlify.

## Lokální vývoj

```bash
npm install
npm run dev
```

Aplikace poběží na `http://localhost:3000`.

## Produkční build

```bash
npm test
npm run typecheck
npm run build
npm run start
```

## SEO a obsah

- Route-level metadata (`title`, `description`, `canonical`, Open Graph, Twitter)
- JSON-LD schema (`LocalBusiness`, `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`)
- `robots.txt` v `public/` a sitemap generovaná z dat aplikace
- Statické generování stránek přes Next.js (`SSG`)

## Důležité soubory

- `src/app/seo/site.ts` – SEO konfigurace, canonical URL a strukturovaná data
- `src/app/data/portfolioProjects.ts` – zdroj dat realizací a jejich rout
- `src/lib/pricing.ts` – sdílený výpočet orientační ceny pro klienta i server
- `src/pages/` – routy Next.js a API formulářů
- `src/pages/sitemap.xml.tsx` – sitemap generovaná ze skutečných rout
  
