import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STUDIO_FILMS } from '../i18n/pages';
import { Cta } from '../shared/cta';
import { Hero } from '../shared/hero';
import { Layout } from '../shared/layout';
import { MEDIA } from '../shared/media';
import { PageBase } from '../shared/page-base';
import { Vimeo } from '../shared/vimeo';

@Component({
  selector: 'app-home-page',
  imports: [Layout, Hero, Vimeo, Cta, RouterLink],
  template: `
    <app-layout [lang]="lang" [page]="'home'">
      <app-hero [eyebrow]="t.home.eyebrow" [title]="t.home.h1" [lead]="t.home.lead"
                [poster]="media.studio.poster" [posterAlt]="media.studio.alt" [video]="media.studio.video">
        <a [routerLink]="link('packages')" class="btn-light">{{ t.common.seePackages }}</a>
        <a [routerLink]="link('contact')" class="btn-line-light">{{ t.common.requestProposal }}</a>
      </app-hero>

      <section class="mx-auto max-w-6xl px-6 py-28 grid gap-12 md:grid-cols-2">
        <h2 class="font-serif text-4xl md:text-5xl leading-tight">{{ t.home.promiseTitle }}</h2>
        <p class="text-lg text-stone leading-relaxed md:pt-3">{{ t.home.promiseText }}</p>
      </section>

      <section class="mx-auto max-w-6xl px-6 pb-28 grid gap-12 md:grid-cols-3">
        @for (p of t.home.pillars; track p.title; let i = $index) {
          <div class="border-t border-ink/15 pt-8">
            <span class="text-accent text-sm tracking-[0.3em]">0{{ i + 1 }}</span>
            <h3 class="mt-4 font-serif text-2xl">{{ p.title }}</h3>
            <p class="mt-4 text-stone leading-relaxed">{{ p.text }}</p>
          </div>
        }
      </section>

      <section class="bg-ink text-cream">
        <div class="mx-auto max-w-6xl px-6 py-28">
          <div class="flex flex-wrap items-end justify-between gap-6 mb-14">
            <h2 class="font-serif text-4xl md:text-5xl">{{ t.home.workTitle }}</h2>
            <a [routerLink]="link('work')" class="link-underline">{{ t.common.allProjects }}</a>
          </div>
          <div class="grid gap-14 md:grid-cols-2">
            @for (film of films; track film.id) {
              <app-vimeo [film]="film" [label]="t.common.brandFilm" />
            }
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-28 grid gap-10 md:grid-cols-[2fr_1fr] items-end">
        <div>
          <h2 class="font-serif text-4xl md:text-5xl">{{ t.home.packagesTitle }}</h2>
          <p class="mt-6 text-lg text-stone max-w-xl">{{ t.home.packagesText }}</p>
        </div>
        <a [routerLink]="link('packages')" class="btn-dark justify-self-start md:justify-self-end">{{ t.common.seePackages }}</a>
      </section>

      <section class="mx-auto max-w-6xl px-6 pb-28 grid gap-14 md:grid-cols-2 items-center">
        <img [src]="media.duo" alt="Miguel & Pamina, MP Films" width="900" height="1350" loading="lazy"
             class="w-full aspect-[4/5] object-cover object-top" />
        <div>
          <h2 class="font-serif italic text-4xl md:text-5xl leading-tight">{{ t.home.aboutTitle }}</h2>
          <p class="mt-6 text-lg text-stone leading-relaxed">{{ t.home.aboutText }}</p>
          <a [routerLink]="link('about')" class="mt-8 inline-block link-underline">{{ t.common.aboutUs }}</a>
        </div>
      </section>

      <section class="border-y border-ink/10">
        <div class="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-6">
          <p class="font-serif text-2xl">{{ t.home.weddingsBand }}</p>
          <a [routerLink]="link('weddings')" class="link-underline">{{ t.nav.toWeddings }}</a>
        </div>
      </section>

      <app-cta [title]="t.home.finalTitle" [text]="t.home.finalText" [primary]="t.common.requestProposal"
               [secondary]="t.common.whatsapp" [contactLink]="link('contact')" />
    </app-layout>
  `,
})
export class HomePage extends PageBase {
  protected readonly films = STUDIO_FILMS.slice(0, 2);
  protected readonly media = MEDIA;

  constructor() {
    super();
    this.seo.apply(this.lang, 'home');
  }
}
