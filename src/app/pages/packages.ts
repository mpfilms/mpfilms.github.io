import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from '../shared/cta';
import { Faq } from '../shared/faq';
import { Intro } from '../shared/intro';
import { Layout } from '../shared/layout';
import { PageBase } from '../shared/page-base';
import { PriceCard } from '../shared/price-card';
import { faqLd, serviceLd } from '../seo.service';

@Component({
  selector: 'app-packages-page',
  imports: [Layout, Intro, PriceCard, Faq, Cta, RouterLink],
  template: `
    <app-layout [lang]="lang" [page]="'packages'">
      <app-intro [eyebrow]="t.packages.eyebrow" [title]="t.packages.h1" [lead]="t.packages.lead" />

      <section class="mx-auto max-w-6xl px-6 grid gap-6 md:grid-cols-3">
        @for (plan of t.packages.plans; track plan.name) {
          <app-price-card [name]="plan.name" [price]="plan.price" [suffix]="t.common.perMonth" [items]="plan.items"
                          [recommended]="plan.recommended" [recommendedLabel]="t.common.recommended">
            <a [routerLink]="link('contact')" class="mt-8 btn-line text-center">{{ t.common.requestProposal }}</a>
          </app-price-card>
        }
      </section>

      <section class="mx-auto max-w-6xl px-6 pt-20">
        <h2 class="font-serif text-4xl">{{ t.packages.singles.title }}</h2>
        <p class="mt-4 max-w-2xl text-stone">{{ t.packages.singles.intro }}</p>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          @for (single of t.packages.singles.items; track single.name) {
            <div class="bg-ink text-cream p-8 md:p-10 flex flex-col">
              <h3 class="font-serif text-3xl">{{ single.name }}</h3>
              <p class="mt-2 text-2xl">{{ single.price }}</p>
              <ul class="mt-6 space-y-2">
                @for (item of single.items; track item) {
                  <li class="flex gap-3"><span class="text-accent">—</span>{{ item }}</li>
                }
              </ul>
              <p class="mt-4 mb-8 text-sm text-cream/70">{{ single.note }}</p>
              <a [routerLink]="link('contact')" class="btn-light mt-auto self-start">{{ t.common.requestProposal }}</a>
            </div>
          }
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 pt-28">
        <h2 class="font-serif text-4xl mb-12">{{ t.packages.processTitle }}</h2>
        <ol class="grid gap-10 md:grid-cols-3">
          @for (step of t.packages.steps; track step.title; let i = $index) {
            <li class="border-t border-ink/15 pt-8">
              <span class="text-accent text-sm tracking-[0.3em]">0{{ i + 1 }}</span>
              <h3 class="mt-4 font-serif text-2xl">{{ step.title }}</h3>
              <p class="mt-3 text-stone">{{ step.text }}</p>
            </li>
          }
        </ol>
      </section>

      <app-faq [title]="t.packages.faqTitle" [items]="t.packages.faq" />

      <app-cta [title]="t.packages.ctaTitle" [text]="t.packages.ctaText" [primary]="t.common.requestProposal"
               [secondary]="t.common.whatsapp" [contactLink]="link('contact')" />
    </app-layout>
  `,
})
export class PackagesPage extends PageBase {
  constructor() {
    super();
    const url = this.url('packages');
    this.seo.apply(this.lang, 'packages', [
      serviceLd(url, this.t.packages.h1, 'Social media video production', [
        ...this.t.packages.plans.map((p, i) => ({
          name: p.name,
          price: [1250, 1850, 2700][i],
          perMonth: true,
        })),
        ...this.t.packages.singles.items.map((s, i) => ({ name: s.name, price: [490, 1490][i] })),
      ]),
      faqLd(url, this.t.packages.faq),
    ]);
  }
}
