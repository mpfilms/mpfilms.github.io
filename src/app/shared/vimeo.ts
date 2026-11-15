import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Film } from '../i18n/pages';

@Component({
  selector: 'app-vimeo',
  template: `
    <figure>
      <div class="aspect-video bg-ink overflow-hidden">
        <iframe [src]="src()" [title]="film().title" loading="lazy" class="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>
      <figcaption class="mt-4 flex items-end justify-between gap-4 border-b border-current/15 pb-3">
        <span class="font-serif text-2xl">{{ film().title }}</span>
        <span class="text-[11px] tracking-[0.2em] uppercase opacity-60 text-right">{{ label() }} · {{ film().place }}</span>
      </figcaption>
    </figure>
  `,
})
export class Vimeo {
  readonly film = input.required<Film>();
  readonly label = input<string>('');
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly src = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://player.vimeo.com/video/${this.film().id}?dnt=1&title=0&byline=0&portrait=0`,
    ),
  );
}
