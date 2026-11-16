export type Lang = 'en' | 'de' | 'es';
export type PageKey =
  | 'home'
  | 'packages'
  | 'work'
  | 'about'
  | 'weddings'
  | 'latam'
  | 'contact'
  | 'imprint'
  | 'privacy';
export type World = 'studio' | 'weddings';

export const LANGS: Lang[] = ['en', 'de', 'es'];
export const PAGE_KEYS: PageKey[] = [
  'home',
  'packages',
  'work',
  'about',
  'weddings',
  'latam',
  'contact',
  'imprint',
  'privacy',
];

export const SITE = 'https://mpfilms.ch';

/** hreflang / html lang per language */
export const HREFLANG: Record<Lang, string> = { en: 'en', de: 'de-CH', es: 'es' };
export const OG_LOCALE: Record<Lang, string> = { en: 'en_GB', de: 'de_CH', es: 'es_ES' };

/** URL slug of every page in every language (no leading or trailing slash) */
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  en: {
    home: '',
    packages: 'social-media-video',
    work: 'work',
    about: 'about',
    weddings: 'weddings',
    latam: 'weddings/latin-america',
    contact: 'contact',
    imprint: 'imprint',
    privacy: 'privacy',
  },
  de: {
    home: 'de',
    packages: 'de/social-media-videoproduktion-basel',
    work: 'de/projekte',
    about: 'de/ueber-uns',
    weddings: 'de/hochzeit',
    latam: 'de/hochzeit/lateinamerika',
    contact: 'de/kontakt',
    imprint: 'de/impressum',
    privacy: 'de/datenschutz',
  },
  es: {
    home: 'es',
    packages: 'es/videos-para-redes',
    work: 'es/proyectos',
    about: 'es/nosotros',
    weddings: 'es/bodas',
    latam: 'es/bodas/latinoamerica',
    contact: 'es/contacto',
    imprint: 'es/aviso-legal',
    privacy: 'es/privacidad',
  },
};

/** Router path, e.g. "/de/kontakt" */
export function pagePath(lang: Lang, page: PageKey): string {
  return '/' + SLUGS[lang][page];
}

/** Canonical absolute URL with trailing slash, e.g. "https://mpfilms.ch/de/kontakt/" */
export function pageUrl(lang: Lang, page: PageKey): string {
  const slug = SLUGS[lang][page];
  return SITE + '/' + (slug ? slug + '/' : '');
}

export function worldOf(page: PageKey): World {
  return page === 'weddings' || page === 'latam' ? 'weddings' : 'studio';
}

export const CONTACT = {
  company: 'MP Films',
  owner: 'Miguel Arauz',
  street: 'c/o Spiegelbergstrasse 33',
  postalCode: '4059',
  city: 'Basel',
  country: 'Schweiz / Switzerland',
  email: 'info@mpfilms.ch',
  phone: '+41 78 908 49 93',
  phoneHref: 'tel:+41789084993',
  whatsapp: 'https://wa.me/41789084993',
  instagramStudio: 'https://www.instagram.com/mpfilms.studio/',
  instagramWeddings: 'https://www.instagram.com/mpfilms.bodas/',
  vimeo: 'https://vimeo.com/mpfilmsch',
  formAction: 'https://formspree.io/f/xpqrrqvz',
};

export interface Film {
  id: string;
  title: string;
  place: string;
  kind: 'brand' | 'wedding' | 'session';
  /** Vertical (9:16) Reel instead of a 16:9 film */
  vertical?: boolean;
}

export const STUDIO_FILMS: Film[] = [
  { id: '1158086146', title: 'Villa Wenkenhof', place: 'Riehen, Basel-Stadt', kind: 'brand' },
  { id: '1246572696', title: 'Zahnarzt Burger', place: 'Basel', kind: 'brand', vertical: true },
  { id: '1181095614', title: 'Kuttelbad', place: 'Wasen im Emmental', kind: 'brand' },
  { id: '1181098742', title: 'Sumiswald', place: 'Emmental', kind: 'brand' },
];

export const WEDDING_FILMS: Film[] = [
  { id: '1240146664', title: 'Tania & Robert', place: 'San Salvador, El Salvador', kind: 'wedding' },
  { id: '1159548288', title: 'Raul & Tati', place: 'San Salvador, El Salvador', kind: 'wedding' },
  { id: '1163197861', title: 'Margarita & Rafa', place: 'Basel', kind: 'session' },
  { id: '1158072046', title: 'Ädu & Sheila', place: 'Huttwil', kind: 'session' },
];
