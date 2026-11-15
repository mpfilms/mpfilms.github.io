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

      <section class="mx-auto max-w-6xl px-6 mt-6">
        <div class="bg-ink text-cream p-8 md:p-12 grid gap-8 md:grid-cols-[1fr_1fr_auto] md:items-center">
          <div>
            <h2 class="font-serif text-3xl">{{ t.packages.pilot.name }}</h2>
            <p class="mt-2 text-2xl">{{ t.packages.pilot.price }}</p>
          </div>
          <div>
            <ul class="space-y-2">
              @for (item of t.packages.pilot.items; track item) {
                <li class="flex gap-3"><span class="text-accent">—</span>{{ item }}</li>
              }
            </ul>
            <p class="mt-4 text-sm text-cream/70">{{ t.packages.pilot.note }}</p>
          </div>
          <a [routerLink]="link('contact')" class="btn-light">{{ t.common.requestProposal }}</a>
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
        { name: this.t.packages.pilot.name, price: 690 },
      ]),
      faqLd(url, this.t.packages.faq),
    ]);
  }
}
