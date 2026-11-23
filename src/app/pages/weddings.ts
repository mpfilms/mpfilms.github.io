import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEDDING_FILMS } from '../i18n/pages';
import { Cta } from '../shared/cta';
import { Faq } from '../shared/faq';
import { Hero } from '../shared/hero';
import { Layout } from '../shared/layout';
import { MEDIA } from '../shared/media';
import { PageBase } from '../shared/page-base';
import { PriceCard } from '../shared/price-card';
import { Vimeo } from '../shared/vimeo';
import { faqLd, serviceLd } from '../seo.service';

@Component({
  selector: 'app-weddings-page',
  imports: [Layout, Hero, Vimeo, PriceCard, Faq, Cta, RouterLink],
  template: `
    <app-layout [lang]="lang" [page]="'weddings'">
      <app-hero [eyebrow]="t.weddings.eyebrow" [title]="t.weddings.h1" [lead]="t.weddings.lead"
                [poster]="media.weddings.poster" [posterAlt]="media.weddings.alt" [video]="media.weddings.video">
        <a [routerLink]="link('weddings')" fragment="packages" class="btn-light">{{ t.weddings.packagesTitle }}</a>
        <a [routerLink]="link('contact')" class="btn-line-light">{{ t.common.requestProposal }}</a>
      </app-hero>

      <section class="mx-auto max-w-6xl px-6 py-28">
        <h2 class="font-serif text-4xl md:text-5xl mb-14">{{ t.weddings.approachTitle }}</h2>
        <div class="grid gap-12 md:grid-cols-3">
          @for (a of t.weddings.approach; track a.title; let i = $index) {
            <div class="border-t border-ink/15 pt-8">
              <span class="text-accent text-sm tracking-[0.3em]">0{{ i + 1 }}</span>
              <h3 class="mt-4 font-serif text-2xl">{{ a.title }}</h3>
              <p class="mt-4 text-stone leading-relaxed">{{ a.text }}</p>
            </div>
          }
        </div>
      </section>

      <section class="bg-ink text-cream">
        <div class="mx-auto max-w-6xl px-6 py-28">
          <h2 class="font-serif text-4xl md:text-5xl mb-14">{{ t.weddings.filmsTitle }}</h2>
          <div class="grid gap-14 md:grid-cols-2">
            @for (film of films; track film.id) {
              <app-vimeo [film]="film" [label]="film.kind === 'session' ? t.common.session : t.common.weddingFilm" />
            }
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-4xl px-6 py-28 text-center">
        <blockquote>
          <p class="font-serif italic text-2xl md:text-3xl leading-relaxed">“{{ t.weddings.testimonial.quote }}”</p>
          <footer class="mt-8 text-[11px] tracking-[0.3em] uppercase text-stone">
            {{ t.weddings.testimonial.author }}
            @if (t.weddings.testimonial.note) {
              <span class="block mt-2 normal-case tracking-normal text-xs">{{ t.weddings.testimonial.note }}</span>
            }
          </footer>
        </blockquote>
      </section>

      <section id="packages" class="mx-auto max-w-6xl px-6 pb-12 scroll-mt-24">
        <h2 class="font-serif text-4xl md:text-5xl">{{ t.weddings.packagesTitle }}</h2>
        <p class="mt-4 text-lg text-stone">{{ t.weddings.packagesLead }}</p>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          @for (p of t.weddings.packages; track p.name) {
            <app-price-card [name]="p.name" [price]="p.price" [subtitle]="p.hours" [items]="p.items"
                            [recommended]="p.recommended" [recommendedLabel]="t.common.recommended">
              <a [routerLink]="link('contact')" class="mt-8 btn-line text-center">{{ t.common.requestProposal }}</a>
            </app-price-card>
          }
        </div>
        <p class="mt-6 text-sm text-stone">{{ t.weddings.travelNote }}</p>
      </section>

      <section class="mx-auto max-w-6xl px-6 pt-16">
        <div class="border border-accent p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 class="font-serif text-3xl">{{ t.weddings.latamTitle }}</h2>
            <p class="mt-2 text-stone">{{ t.weddings.latamText }}</p>
          </div>
          <a [routerLink]="link('latam')" class="link-underline">{{ t.nav.latam }} →</a>
        </div>
      </section>

      <app-faq [title]="t.weddings.faqTitle" [items]="t.weddings.faq" />

      <app-cta [title]="t.weddings.finalTitle" [text]="t.weddings.finalText" [primary]="t.common.requestProposal"
               [secondary]="t.common.whatsapp" [contactLink]="link('contact')" />
    </app-layout>
  `,
})
export class WeddingsPage extends PageBase {
  protected readonly films = WEDDING_FILMS;
  protected readonly media = MEDIA;

  constructor() {
    super();
    const url = this.url('weddings');
    this.seo.apply(this.lang, 'weddings', [
      serviceLd(
        url,
        this.t.weddings.eyebrow,
        'Wedding videography',
        this.t.weddings.packages.map((p, i) => ({ name: p.name, price: [2200, 3600, 5400][i] })),
      ),
      faqLd(url, this.t.weddings.faq),
    ]);
  }
}
