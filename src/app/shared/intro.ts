import { Component, input } from '@angular/core';

@Component({
  selector: 'app-intro',
  template: `
    <section class="mx-auto max-w-6xl px-6 pt-24 pb-16">
      <h1>
        <span class="block text-[11px] md:text-xs tracking-[0.4em] uppercase text-accent mb-6">{{ eyebrow() }}</span>
        <span class="block font-serif text-5xl md:text-6xl leading-[1.08] max-w-4xl">{{ title() }}</span>
      </h1>
      @if (lead()) {
        <p class="mt-8 max-w-2xl text-lg text-stone">{{ lead() }}</p>
      }
    </section>
  `,
})
export class Intro {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>('');
}
