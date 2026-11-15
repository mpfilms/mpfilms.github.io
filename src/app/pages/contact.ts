import { Component } from '@angular/core';
import { CONTACT } from '../i18n/pages';
import { Intro } from '../shared/intro';
import { Layout } from '../shared/layout';
import { PageBase } from '../shared/page-base';

@Component({
  selector: 'app-contact-page',
  imports: [Layout, Intro],
  template: `
    <app-layout [lang]="lang" [page]="'contact'">
      <app-intro [eyebrow]="t.contact.eyebrow" [title]="t.contact.h1" [lead]="t.contact.lead" />

      <section class="mx-auto max-w-6xl px-6 pb-28 grid gap-16 md:grid-cols-[2fr_1fr]">
        <form [attr.action]="contact.formAction" method="POST" class="grid gap-8">
          <input type="hidden" name="_subject" value="Neue Anfrage über mpfilms.ch" />
          <input type="hidden" name="page_language" [value]="lang" />
          <input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <div class="grid gap-8 md:grid-cols-2">
            <label class="field">
              <span>{{ l.name }}</span>
              <input type="text" name="name" required autocomplete="name" />
            </label>
            <label class="field">
              <span>{{ l.email }}</span>
              <input type="email" name="email" required autocomplete="email" />
            </label>
          </div>

          <label class="field">
            <span>{{ l.phone }}</span>
            <input type="tel" name="phone" autocomplete="tel" />
          </label>

          <fieldset class="field">
            <legend>{{ l.project }}</legend>
            <div class="mt-3 flex flex-wrap gap-6 normal-case tracking-normal text-base">
              <label class="flex items-center gap-2"><input type="radio" name="project" value="studio" required /> {{ l.projectStudio }}</label>
              <label class="flex items-center gap-2"><input type="radio" name="project" value="wedding" /> {{ l.projectWedding }}</label>
            </div>
          </fieldset>

          <label class="field">
            <span>{{ l.details }}</span>
            <input type="text" name="details" required />
          </label>

          <div class="grid gap-8 md:grid-cols-2">
            <label class="field">
              <span>{{ l.budget }}</span>
              <select name="budget" required>
                <option value="" disabled selected>{{ l.choose }}</option>
                <optgroup [label]="t.contact.budgetStudioLabel">
                  @for (o of t.contact.budgetStudio; track o) {
                    <option [value]="o">{{ o }}</option>
                  }
                </optgroup>
                <optgroup [label]="t.contact.budgetWeddingLabel">
                  @for (o of t.contact.budgetWedding; track o) {
                    <option [value]="o">{{ o }}</option>
                  }
                </optgroup>
                <option [value]="t.contact.budgetUnsure">{{ t.contact.budgetUnsure }}</option>
              </select>
            </label>
            <label class="field">
              <span>{{ l.language }}</span>
              <select name="language">
                @for (o of t.contact.languages; track o) {
                  <option [value]="o">{{ o }}</option>
                }
              </select>
            </label>
          </div>

          <label class="field">
            <span>{{ l.source }}</span>
            <select name="source">
              <option value="" selected>{{ l.choose }}</option>
              @for (o of t.contact.sources; track o) {
                <option [value]="o">{{ o }}</option>
              }
            </select>
          </label>

          <label class="field">
            <span>{{ l.message }}</span>
            <textarea name="message" rows="5"></textarea>
          </label>

          <button type="submit" class="btn-dark justify-self-start">{{ l.submit }}</button>
        </form>

        <aside class="space-y-6">
          <p class="text-[11px] tracking-[0.3em] uppercase text-stone">{{ t.contact.directTitle }}</p>
          <a [href]="contact.whatsapp" target="_blank" rel="noopener" class="btn-line block text-center">{{ t.common.whatsapp }}</a>
          <ul class="space-y-2 text-lg">
            <li><a [href]="'mailto:' + contact.email" class="link-underline">{{ contact.email }}</a></li>
            <li><a [href]="contact.phoneHref">{{ contact.phone }}</a></li>
          </ul>
          <p class="text-stone">{{ contact.company }}<br />{{ contact.street }}<br />{{ contact.postalCode }} {{ contact.city }}</p>
        </aside>
      </section>
    </app-layout>
  `,
})
export class ContactPage extends PageBase {
  protected readonly contact = CONTACT;
  protected readonly l = this.t.contact.labels;

  constructor() {
    super();
    this.seo.apply(this.lang, 'contact');
  }
}
