import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT } from '../i18n/pages';
import { SocialIcon } from './social-icon';

@Component({
  selector: 'app-cta',
  imports: [RouterLink, SocialIcon],
  template: `
    <section class="bg-sand">
      <div class="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 class="font-serif text-4xl md:text-5xl">{{ title() }}</h2>
        <p class="mt-6 text-lg text-stone">{{ text() }}</p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <a [routerLink]="contactLink()" class="btn-dark">{{ primary() }}</a>
          <a [href]="whatsapp" target="_blank" rel="noopener" class="btn-line gap-3"><app-social-icon name="whatsapp" />{{ secondary() }}</a>
        </div>
      </div>
    </section>
  `,
})
export class Cta {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly primary = input.required<string>();
  readonly secondary = input.required<string>();
  readonly contactLink = input.required<string>();
  protected readonly whatsapp = CONTACT.whatsapp;
}
