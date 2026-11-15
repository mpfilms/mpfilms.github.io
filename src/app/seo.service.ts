import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CONTENT } from './i18n/content';
import {
  CONTACT,
  HREFLANG,
  LANGS,
  Lang,
  OG_LOCALE,
  PageKey,
  SITE,
  pageUrl,
} from './i18n/pages';

type Json = Record<string, unknown>;

const OG_IMAGE = SITE + '/assets/img/og-mp-films.jpg';
const BUSINESS_ID = SITE + '/#business';
const WEBSITE_ID = SITE + '/#website';

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  /** Sets title, meta, canonical, hreflang, Open Graph and JSON-LD for a page. */
  apply(lang: Lang, page: PageKey, extra: Json[] = []): void {
    const m = CONTENT[lang].meta[page];
    const url = pageUrl(lang, page);

    this.title.setTitle(m.title);
    this.meta.updateTag({ name: 'description', content: m.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'MP Films' });
    this.meta.updateTag({ property: 'og:title', content: m.title });
    this.meta.updateTag({ property: 'og:description', content: m.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.doc.documentElement.setAttribute('lang', HREFLANG[lang]);

    // canonical + hreflang alternates
    this.doc.head.querySelectorAll('link[data-seo]').forEach((el) => el.remove());
    this.addLink('canonical', url);
    for (const l of LANGS) {
      this.addLink('alternate', pageUrl(l, page), HREFLANG[l]);
    }
    this.addLink('alternate', pageUrl('en', page), 'x-default');

    // JSON-LD
    const graph: Json[] = [
      business(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE + '/',
        name: 'MP Films',
        inLanguage: LANGS.map((l) => HREFLANG[l]),
        publisher: { '@id': BUSINESS_ID },
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: m.title,
        description: m.description,
        inLanguage: HREFLANG[lang],
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
      },
      ...extra,
    ];
    let script = this.doc.getElementById('ld-json');
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'ld-json';
      script.setAttribute('type', 'application/ld+json');
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }

  private addLink(rel: string, href: string, hreflang?: string): void {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    link.setAttribute('data-seo', '');
    this.doc.head.appendChild(link);
  }
}

function business(): Json {
  return {
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: 'MP Films',
    slogan: 'Swiss precision. Latin soul.',
    description:
      'MP Films is a Swiss-Salvadoran film studio based in Basel: social media video and brand films for premium businesses in Basel and Bern, and film-only wedding videography in Switzerland and Latin America.',
    url: SITE + '/',
    logo: SITE + '/assets/logo/mpfilms-logo-black.png',
    image: OG_IMAGE,
    email: CONTACT.email,
    telephone: '+41789084993',
    priceRange: 'CHF 690 – CHF 5,400',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.street,
      postalCode: CONTACT.postalCode,
      addressLocality: 'Basel',
      addressRegion: 'BS',
      addressCountry: 'CH',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Basel-Stadt' },
      { '@type': 'AdministrativeArea', name: 'Basel-Landschaft' },
      { '@type': 'AdministrativeArea', name: 'Bern' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'El Salvador' },
      { '@type': 'Country', name: 'Guatemala' },
      { '@type': 'Country', name: 'Mexico' },
    ],
    knowsLanguage: ['de', 'gsw', 'en', 'es'],
    founder: [
      { '@type': 'Person', name: 'Miguel Arauz', jobTitle: 'Director & Cinematographer' },
      { '@type': 'Person', name: 'Pamina', jobTitle: 'Producer' },
    ],
    sameAs: [CONTACT.instagramStudio, CONTACT.instagramWeddings, CONTACT.vimeo],
  };
}

/** FAQPage JSON-LD from question/answer pairs shown on the page. */
export function faqLd(url: string, faq: { q: string; a: string }[]): Json {
  return {
    '@type': 'FAQPage',
    '@id': url + '#faq',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Service + offers JSON-LD. */
export function serviceLd(
  url: string,
  name: string,
  serviceType: string,
  offers: { name: string; price: number; perMonth?: boolean }[],
): Json {
  return {
    '@type': 'Service',
    '@id': url + '#service',
    name,
    serviceType,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    offers: offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: 'CHF',
      ...(o.perMonth
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: o.price,
              priceCurrency: 'CHF',
              unitCode: 'MON',
            },
          }
        : {}),
    })),
  };
}
