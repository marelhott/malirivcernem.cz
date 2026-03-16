
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
npm run build
npm run start
```

## SEO a obsah

- Route-level metadata (`title`, `description`, `canonical`, Open Graph, Twitter)
- JSON-LD schema (`LocalBusiness`, `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`)
- `robots.txt` a `sitemap.xml` v `public/`
- Statické generování stránek přes Next.js (`SSG`)

## Důležité soubory

- `/Users/mulenmara/Documents/MVC WEB NEW/src/app/seo/site.ts` - SEO konfigurace, canonical URL, schema data
- `/Users/mulenmara/Documents/MVC WEB NEW/src/pages/` - routy Next.js
- `/Users/mulenmara/Documents/MVC WEB NEW/public/robots.txt`
- `/Users/mulenmara/Documents/MVC WEB NEW/public/sitemap.xml`
  
