import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { LANGS, PAGE_KEYS, PageKey, SLUGS } from './i18n/pages';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { HomePage } from './pages/home';
import { LatamPage } from './pages/latam';
import { ImprintPage, PrivacyPage } from './pages/legal';
import { PackagesPage } from './pages/packages';
import { WeddingsPage } from './pages/weddings';
import { WorkPage } from './pages/work';

const PAGES: Record<PageKey, Type<unknown>> = {
  home: HomePage,
  packages: PackagesPage,
  work: WorkPage,
  about: AboutPage,
  weddings: WeddingsPage,
  latam: LatamPage,
  contact: ContactPage,
  imprint: ImprintPage,
  privacy: PrivacyPage,
};

export const routes: Routes = [
  ...LANGS.flatMap((lang) =>
    PAGE_KEYS.map((page) => ({
      path: SLUGS[lang][page],
      pathMatch: 'full' as const,
      component: PAGES[page],
      data: { lang, page },
    })),
  ),
  { path: '**', redirectTo: '' },
];
