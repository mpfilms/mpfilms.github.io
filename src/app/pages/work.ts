import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STUDIO_FILMS } from '../i18n/pages';
import { Cta } from '../shared/cta';
import { Intro } from '../shared/intro';
import { Layout } from '../shared/layout';
import { PageBase } from '../shared/page-base';
import { Vimeo } from '../shared/vimeo';

@Component({
  selector: 'app-work-page',
  imports: [Layout, Intro, Vimeo, Cta, RouterLink],
  template: `
    <app-layout [lang]="lang" [page]="'work'">
      <app-intro [eyebrow]="t.work.eyebrow" [title]="t.work.h1" [lead]="t.work.lead" />
      <section class="mx-auto max-w-6xl px-6 pb-28 grid gap-14 md:grid-cols-2">
        @for (film of films; track film.id) {
          <app-vimeo [film]="film" [label]="t.common.brandFilm" />
        }
      </section>
      <section class="border-y border-ink/10">
        <div class="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p class="font-serif text-2xl">{{ t.work.weddingsTitle }}</p>
            <p class="text-stone">{{ t.work.weddingsText }}</p>
          </div>
          <a [routerLink]="link('weddings')" class="link-underline">{{ t.nav.toWeddings }}</a>
        </div>
      </section>
      <app-cta [title]="t.home.finalTitle" [text]="t.home.finalText" [primary]="t.common.requestProposal"
               [secondary]="t.common.whatsapp" [contactLink]="link('contact')" />
    </app-layout>
  `,
})
export class WorkPage extends PageBase {
  protected readonly films = STUDIO_FILMS;

  constructor() {
    super();
    this.seo.apply(this.lang, 'work');
  }
}
