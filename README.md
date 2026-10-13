# Echofied — landing page

Fast, static, single-page site for echofied.com. Plain HTML, CSS, and vanilla JavaScript. No build step.

## Structure
- `index.html` — the whole page
- `assets/css/styles.css` — design system and layout
- `assets/js/main.js` — nav, reveal animations, form
- `assets/js/demo-*.js` — the interactive demo (inbox, CRM, drafts)
- `_headers` and `_redirects` — Cloudflare Pages config
- `robots.txt`, `sitemap.xml`, `llms.txt` — crawlers and AI indexing
- `site.webmanifest` — install metadata
- `assets/img/` — SVG logo, favicon, and OG image

## Local preview
Open `index.html` in a browser, or run:

    npx serve .

## Deploy
Push to `main`. Cloudflare Pages builds and deploys automatically.

## Performance notes
- No frameworks. No render-blocking JS. Scripts are `defer`red.
- SVG assets only — no raster payloads.
- Animations use CSS transforms and opacity only.
- Reduced-motion users get a static layout.

## Security
- Strict CSP, HSTS, X-Frame-Options DENY, and Referrer-Policy set in `_headers`.
- `_redirects` catches unknown paths and returns the home page.
- Contact form is client-side only; wire it to your endpoint of choice (Formspree, Cloudflare Worker, etc.).