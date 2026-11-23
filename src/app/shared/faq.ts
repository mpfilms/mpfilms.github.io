import { Component, input } from '@angular/core';

@Component({
  selector: 'app-faq',
  template: `
    <section class="mx-auto max-w-3xl px-6 py-24">
      <h2 class="font-serif text-4xl mb-10">{{ title() }}</h2>
      <div class="divide-y divide-ink/10 border-y border-ink/10">
        @for (item of items(); track item.q) {
          <details class="group py-6">
            <summary class="list-none cursor-pointer flex justify-between gap-6 text-lg">
              <h3 class="font-medium">{{ item.q }}</h3>
              <span class="text-accent group-open:rotate-45 transition">+</span>
            </summary>
            <p class="mt-4 text-stone leading-relaxed">{{ item.a }}</p>
          </details>
        }
      </div>
    </section>
  `,
})
export class Faq {
  readonly title = input.required<string>();
  readonly items = input.required<{ q: string; a: string }[]>();
}
