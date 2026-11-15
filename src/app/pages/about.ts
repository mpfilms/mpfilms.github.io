import { Component } from '@angular/core';
import { Cta } from '../shared/cta';
import { Intro } from '../shared/intro';
import { Layout } from '../shared/layout';
import { MEDIA } from '../shared/media';
import { PageBase } from '../shared/page-base';

@Component({
  selector: 'app-about-page',
  imports: [Layout, Intro, Cta],
  template: `
    <app-layout [lang]="lang" [page]="'about'">
      <app-intro [eyebrow]="t.about.eyebrow" [title]="t.about.h1" [lead]="t.about.lead" />

      <section class="mx-auto max-w-6xl px-6 pb-28 grid gap-14 md:grid-cols-2 items-start">
        <img [src]="duo" alt="Miguel & Pamina, MP Films" width="900" height="1350"
             class="w-full aspect-[4/5] object-cover object-top" />
        <div>
          <h2 class="font-serif text-3xl mb-8">{{ t.about.storyTitle }}</h2>
          <div class="space-y-6 text-lg text-stone leading-relaxed">
            @for (p of t.about.story; track p) {
              <p>{{ p }}</p>
            }
          </div>
        </div>
      </section>

      <section class="bg-ink text-cream">
        <div class="mx-auto max-w-4xl px-6 py-28 text-center">
          <h2 class="font-serif italic text-4xl md:text-5xl">{{ t.about.conceptTitle }}</h2>
          <p class="mt-8 text-lg text-cream/80 leading-relaxed">{{ t.about.conceptText }}</p>
        </div>
      </section>

      <section class="mx-auto max-w-4xl px-6 py-28">
        <h2 class="font-serif text-3xl mb-10">{{ t.about.factsTitle }}</h2>
        <dl class="divide-y divide-ink/10 border-y border-ink/10">
          @for (f of t.about.facts; track f.label) {
            <div class="grid grid-cols-[10rem_1fr] gap-6 py-5">
              <dt class="text-[11px] tracking-[0.25em] uppercase text-stone pt-1">{{ f.label }}</dt>
              <dd class="text-lg">{{ f.value }}</dd>
            </div>
          }
        </dl>
      </section>

      <app-cta [title]="t.home.finalTitle" [text]="t.home.finalText" [primary]="t.common.requestProposal"
               [secondary]="t.common.whatsapp" [contactLink]="link('contact')" />
    </app-layout>
  `,
})
export class AboutPage extends PageBase {
  protected readonly duo = MEDIA.duo;

  constructor() {
    super();
    this.seo.apply(this.lang, 'about');
  }
}
