import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section class="relative min-h-[88svh] flex items-end overflow-hidden bg-ink text-cream">
      @if (video()) {
        <video class="absolute inset-0 h-full w-full object-cover opacity-75" autoplay muted loop playsinline
               preload="metadata" [attr.poster]="poster()" aria-hidden="true">
          <source [attr.src]="video()" type="video/mp4" />
        </video>
      } @else {
        <img [src]="poster()" [alt]="posterAlt()" class="absolute inset-0 h-full w-full object-cover opacity-60"
             [style.object-position]="position()" fetchpriority="high" />
      }
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
      <div class="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-40">
        <h1>
          <span class="block text-[11px] md:text-xs tracking-[0.4em] uppercase text-cream/80 mb-6">{{ eyebrow() }}</span>
          <span class="block font-serif text-5xl md:text-7xl leading-[1.05] max-w-4xl">{{ title() }}</span>
        </h1>
        <p class="mt-8 max-w-xl text-lg text-cream/85 font-light">{{ lead() }}</p>
        <div class="mt-10 flex flex-wrap gap-4"><ng-content /></div>
      </div>
    </section>
  `,
})
export class Hero {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input.required<string>();
  readonly poster = input.required<string>();
  readonly posterAlt = input<string>('');
  readonly video = input<string>('');
  readonly position = input<string>('center 25%');
}
