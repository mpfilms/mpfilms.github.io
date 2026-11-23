import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEDDING_FILMS } from '../i18n/pages';
import { Cta } from '../shared/cta';
import { Hero } from '../shared/hero';
import { Layout } from '../shared/layout';
import { MEDIA } from '../shared/media';
import { PageBase } from '../shared/page-base';
import { Vimeo } from '../shared/vimeo';

@Component({
  selector: 'app-latam-page',
  imports: [Layout, Hero, Vimeo, Cta, RouterLink],
  template: `
    <app-layout [lang]="lang" [page]="'latam'">
      <app-hero [eyebrow]="t.latam.eyebrow" [title]="t.latam.h1" [lead]="t.latam.lead"
                [poster]="media.weddings.poster" [posterAlt]="media.weddings.alt" [video]="media.weddings.video">
        <a [routerLink]="link('contact')" class="btn-light">{{ t.common.requestProposal }}</a>
      </app-hero>

      <section class="mx-auto max-w-6xl px-6 py-28 grid gap-12 md:grid-cols-3">
        @for (p of t.latam.points; track p.title; let i = $index) {
          <div class="border-t border-ink/15 pt-8">
            <span class="text-accent text-sm tracking-[0.3em]">0{{ i + 1 }}</span>
            <h2 class="mt-4 font-serif text-2xl">{{ p.title }}</h2>
            <p class="mt-4 text-stone leading-relaxed">{{ p.text }}</p>
          </div>
        }
      </section>

      <section class="bg-ink text-cream">
        <div class="mx-auto max-w-6xl px-6 py-28">
          <h2 class="font-serif text-4xl md:text-5xl mb-14">{{ t.latam.filmsTitle }}</h2>
          <div class="grid gap-14 md:grid-cols-2">
            @for (film of films; track film.id) {
              <app-vimeo [film]="film" [label]="t.common.weddingFilm" />
            }
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20 flex flex-wrap items-center justify-between gap-6">
        <p class="font-serif text-2xl">{{ t.latam.packagesText }}</p>
        <a [routerLink]="link('weddings')" fragment="packages" class="link-underline">{{ t.weddings.packagesTitle }} →</a>
      </section>

      <app-cta [title]="t.latam.finalTitle" [text]="t.latam.finalText" [primary]="t.common.requestProposal"
               [secondary]="t.common.whatsapp" [contactLink]="link('contact')" />
    </app-layout>
  `,
})
export class LatamPage extends PageBase {
  protected readonly films = WEDDING_FILMS.filter((f) => f.kind === 'wedding');
  protected readonly media = MEDIA;

  constructor() {
    super();
    this.seo.apply(this.lang, 'latam');
  }
}
