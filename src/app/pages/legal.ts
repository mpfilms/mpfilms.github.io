import { Component } from '@angular/core';
import { CONTACT } from '../i18n/pages';
import { Layout } from '../shared/layout';
import { PageBase } from '../shared/page-base';

@Component({
  selector: 'app-imprint-page',
  imports: [Layout],
  template: `
    <app-layout [lang]="lang" [page]="'imprint'">
      <section class="mx-auto max-w-3xl px-6 py-24">
        <h1 class="font-serif text-5xl mb-14">{{ t.imprint.h1 }}</h1>
        <dl class="divide-y divide-ink/10 border-y border-ink/10">
          <div class="legal-row"><dt>{{ t.imprint.company }}</dt><dd>{{ c.company }} · {{ t.imprint.legalForm }}</dd></div>
          <div class="legal-row"><dt>{{ t.imprint.owner }}</dt><dd>{{ c.owner }}</dd></div>
          <div class="legal-row"><dt>{{ t.imprint.address }}</dt><dd>{{ c.street }}<br />{{ c.postalCode }} {{ c.city }}<br />{{ c.country }}</dd></div>
          <div class="legal-row"><dt>{{ t.imprint.contact }}</dt><dd><a [href]="'mailto:' + c.email">{{ c.email }}</a><br /><a [href]="c.phoneHref">{{ c.phone }}</a></dd></div>
          <div class="legal-row"><dt>{{ t.imprint.responsible }}</dt><dd>{{ c.owner }}</dd></div>
        </dl>
        <h2 class="font-serif text-2xl mt-14 mb-4">{{ t.imprint.disclaimerTitle }}</h2>
        <p class="text-stone leading-relaxed">{{ t.imprint.disclaimer }}</p>
      </section>
    </app-layout>
  `,
})
export class ImprintPage extends PageBase {
  protected readonly c = CONTACT;

  constructor() {
    super();
    this.seo.apply(this.lang, 'imprint');
  }
}

@Component({
  selector: 'app-privacy-page',
  imports: [Layout],
  template: `
    <app-layout [lang]="lang" [page]="'privacy'">
      <section class="mx-auto max-w-3xl px-6 py-24">
        <h1 class="font-serif text-5xl">{{ t.privacy.h1 }}</h1>
        <p class="mt-4 text-sm text-stone">{{ t.privacy.updated }}</p>
        @for (s of t.privacy.sections; track s.title) {
          <h2 class="font-serif text-2xl mt-12 mb-3">{{ s.title }}</h2>
          <p class="text-stone leading-relaxed">{{ s.text }}</p>
        }
      </section>
    </app-layout>
  `,
})
export class PrivacyPage extends PageBase {
  constructor() {
    super();
    this.seo.apply(this.lang, 'privacy');
  }
}
