import { Component, input } from '@angular/core';

@Component({
  selector: 'app-price-card',
  template: `
    <article class="h-full flex flex-col border p-8 bg-cream"
             [class]="recommended() ? 'border-accent' : 'border-ink/10'">
      @if (recommended()) {
        <span class="self-start mb-4 text-[10px] tracking-[0.3em] uppercase bg-accent text-cream px-3 py-1">{{ recommendedLabel() }}</span>
      }
      <h3 class="font-serif text-3xl">{{ name() }}</h3>
      @if (subtitle()) {
        <p class="mt-1 text-sm text-stone">{{ subtitle() }}</p>
      }
      <p class="mt-6 text-2xl tracking-wide">{{ price() }} <span class="text-sm text-stone">{{ suffix() }}</span></p>
      <ul class="mt-6 space-y-3 text-[15px] flex-1">
        @for (item of items(); track item) {
          <li class="flex gap-3"><span class="text-accent">—</span><span>{{ item }}</span></li>
        }
      </ul>
      <ng-content />
    </article>
  `,
})
export class PriceCard {
  readonly name = input.required<string>();
  readonly price = input.required<string>();
  readonly items = input.required<string[]>();
  readonly suffix = input<string>('');
  readonly subtitle = input<string>('');
  readonly recommended = input<boolean>(false);
  readonly recommendedLabel = input<string>('');
}
