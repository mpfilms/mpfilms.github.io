---
name: angular-dev
description: Desarrollador Angular 21 de mpfilms.ch. Úsalo para rutas, i18n, prerender (SSG), rendimiento, componentes y deploy a GitHub Pages.
---
# Angular Dev — MP Films

## Antes de empezar
Lee `.agents/brand-core.md` y la tabla de páginas de `seo-geo-architect`.

## Stack
Angular 21, standalone components, Tailwind 4, `@angular/ssr` con `RenderMode.Prerender`, deploy con `angular-cli-ghpages` a GitHub Pages (solo estático: nada de SSR en runtime).

## Reglas
1. Una ruta real por página e idioma (`/`, `/de/`, `/es/`, `/weddings/`, `/de/hochzeit/`, `/es/bodas/`, `impressum`, `datenschutz`...). Todas listadas para prerender.
2. Idiomas por URL, no por localStorage ni manipulando el DOM. Textos en archivos por idioma; `lang` del `<html>` correcto en el HTML generado.
3. Title, meta, canonical, hreflang y JSON-LD por ruta con `Title`, `Meta` y un servicio SEO.
4. Nada de contenido escondido detrás de un estado inicial (`activeBranch = 'none'` queda prohibido).
5. Fuentes self-hosted desde `public/fonts` con `font-display: swap`.
6. Vídeo del Hero: MP4 propio < 3 MB, `muted playsinline autoplay loop`, con `poster` WebP.
7. Vimeo con carga diferida (fachada con miniatura, iframe al hacer clic).
8. Siempre en una rama nueva; nunca directo a `main`.
9. Al terminar: ejecutar el skill `angular-build-lint-runner`.
