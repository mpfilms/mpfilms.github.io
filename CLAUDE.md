# MP Films – Webseite (mpfilms.ch)

Allgemeiner Kontext zu MP Films steht in `../CLAUDE.md`. Diese Datei betrifft nur die Webseite.

## Stack

- Angular 21 (standalone components), Tailwind CSS 4, TypeScript 5.9
- Statisch vorgerendert (SSG): `outputMode: "static"`, alle Routen `RenderMode.Prerender` (`src/app/app.routes.server.ts`)
- Hosting: GitHub Pages über `angular-cli-ghpages`, Custom Domain `mpfilms.ch` (`public/CNAME`)
- Tests: Vitest · Lint: ESLint · Format: Prettier (printWidth 100, single quotes)

## Befehle (im Ordner `website/`)

```bash
npm start            # Dev-Server auf http://localhost:4200
npm run build        # Produktions-Build nach dist/
npm run lint         # ESLint mit --fix auf src/
npm run format       # Prettier auf src/
npm test             # Unit-Tests (Vitest)
npm run deploy       # Build + Deploy auf den Branch gh-pages (geht live!)
```

`npm run deploy` veröffentlicht die Seite. Nur auf ausdrückliche Anweisung ausführen.

## Branches

- `main` – Standard-Branch auf GitHub
- `website-v2` – aktuelle Arbeit an der neuen Struktur (Studio und Weddings, EN/DE/ES)
- `dev` – Entwicklungs-Branch
- `gh-pages` – vom Deploy erzeugt, **nie von Hand bearbeiten**

Nur auf ausdrückliche Anweisung committen oder pushen.

## Aufbau

```
src/app/
├── app.routes.ts         Routen werden aus LANGS × PAGE_KEYS × SLUGS erzeugt
├── app.routes.server.ts  Prerender für alle Routen
├── seo.service.ts        Title, Meta, hreflang, JSON-LD
├── i18n/
│   ├── pages.ts          Sprachen, Seiten-Keys und URL-Slugs pro Sprache
│   ├── content.ts        CONTENT[lang]
│   └── content.en|de|es.ts   alle Texte der Seite (EN definiert den Typ Content)
├── pages/                home, packages, work, about, weddings, latam, contact, legal (Impressum und Datenschutz)
└── shared/               layout, hero, intro, cta, faq, price-card, media, vimeo, page-base
public/
├── assets/img, logo, video   eigene Bilder, Logos, Hero-Videos
├── fonts/                Playfair Display und Jost (selbst gehostet)
├── sitemap.xml, robots.txt, llms.txt, 404.html, CNAME
```

## Regeln für Änderungen

- **Texte** stehen ausschliesslich in `src/app/i18n/content.*.ts`, nicht hart codiert in den Komponenten. Jede Sprache wird eigenständig geschrieben, nicht übersetzt. Neue Felder zuerst in `content.en.ts` anlegen (der Typ), dann in DE und ES ergänzen.
- **Neue Seite:** Key und Slugs in `i18n/pages.ts`, Komponente in `pages/`, Eintrag in `PAGES` in `app.routes.ts`, dazu `sitemap.xml` und hreflang prüfen.
- **Schriften** nur selbst gehostet aus `public/fonts/`, nie über das Google-Fonts-CDN.
- **Bilder und Videos** nur eigenes Material, kein Stock. Original-4K-Material gehört nach `public/assets/video/source/` (per .gitignore ausgeschlossen); im Repo liegen nur die Web-Versionen (1080p, ohne Ton).
- **Budgets** (angular.json): Initial-Bundle max. 1 MB, Komponenten-Styles max. 8 kB.
- Vor dem Abschluss einer Änderung `npm run lint` und `npm run build` laufen lassen.

## Marke und Agenten-Skills

- Markenregeln (Angebote, Preise, Tonalität, Liste verbotener Wörter, Farben): `.agents/brand-core.md`. Vor jedem neuen Text lesen.
- Spezialisierte Anleitungen in `.agents/skills/`: angular-dev, seo-geo-architect, copywriter-luxury, brand-auditor, brand-strategist, local-gbp, social-content, build-lint-runner.
- Vor dem Veröffentlichen von Texten den Check aus `brand-auditor` anwenden.
