import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialIcon } from './social-icon';
import { CONTENT } from '../i18n/content';
import { CONTACT, HREFLANG, LANGS, Lang, PageKey, pagePath, worldOf } from '../i18n/pages';

interface NavItem {
  page: PageKey;
  label: string;
}

@Component({
  selector: 'app-layout',
  imports: [RouterLink, SocialIcon],
  host: { '[attr.data-world]': 'world()', class: 'block' },
  template: `
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-cream">Skip</a>
    <header class="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-ink/5">
      <div class="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between gap-6">
        <a [routerLink]="homeLink()" class="flex items-center gap-3 shrink-0">
          <img src="/assets/logo/mpfilms-logo-black.png" alt="MP Films" width="40" height="47" class="h-11 w-auto" />
          <span class="hidden sm:inline text-[11px] tracking-[0.35em] uppercase">{{ worldName() }}</span>
        </a>

        <nav class="hidden lg:flex items-center gap-7 text-[12px] tracking-[0.18em] uppercase" aria-label="Main">
          @for (item of navItems(); track item.page) {
            <a [routerLink]="link(item.page)" class="hover-accent" [class.text-accent]="item.page === page()">{{ item.label }}</a>
          }
          <a [routerLink]="switchLink()" class="text-stone hover-accent">{{ switchLabel() }}</a>
        </nav>

        <div class="flex items-center gap-5">
          <div class="flex items-center gap-1 text-[12px] tracking-[0.15em]" [attr.aria-label]="t().nav.language">
            @for (l of langs; track l) {
              <a [routerLink]="langLink(l)" [attr.hreflang]="hreflang[l]" [attr.lang]="hreflang[l]"
                 class="px-1.5 py-3" [class.font-semibold]="l === lang()" [class.text-stone]="l !== lang()">{{ l.toUpperCase() }}</a>
            }
          </div>
          <details class="lg:hidden relative">
            <summary class="list-none cursor-pointer py-3 text-[12px] tracking-[0.18em] uppercase">{{ t().nav.menu }}</summary>
            <div class="absolute right-0 mt-1 w-60 bg-cream border border-ink/10 shadow-xl px-6 py-4 flex flex-col gap-1 text-[13px] tracking-[0.12em] uppercase [&>a]:py-2">
              @for (item of navItems(); track item.page) {
                <a [routerLink]="link(item.page)">{{ item.label }}</a>
              }
              <a [routerLink]="switchLink()" class="text-stone">{{ switchLabel() }}</a>
            </div>
          </details>
        </div>
      </div>
    </header>

    <main id="main"><ng-content /></main>

    <footer class="bg-ink text-cream mt-0">
      <div class="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div class="space-y-4">
          <img src="/assets/logo/mpfilms-logo-white.png" alt="MP Films" width="56" height="65" class="h-16 w-auto" loading="lazy" />
          <p class="font-serif italic text-lg">{{ t().footer.tagline }}</p>
          <p class="text-sm text-cream/60">{{ t().footer.based }}</p>
        </div>
        <div>
          <p class="footer-title">{{ t().footer.studioTitle }}</p>
          <ul class="space-y-0.5 text-sm [&_a]:inline-block [&_a]:py-1.5">
            <li><a [routerLink]="link('home')">{{ t().nav.studio }}</a></li>
            <li><a [routerLink]="link('packages')">{{ t().nav.packages }}</a></li>
            <li><a [routerLink]="link('work')">{{ t().nav.work }}</a></li>
            <li><a [routerLink]="link('about')">{{ t().nav.about }}</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-title">{{ t().footer.weddingsTitle }}</p>
          <ul class="space-y-0.5 text-sm [&_a]:inline-block [&_a]:py-1.5">
            <li><a [routerLink]="link('weddings')">{{ t().nav.weddings }}</a></li>
            <li><a [routerLink]="link('latam')">{{ t().nav.latam }}</a></li>
          </ul>
        </div>
        <div>
          <p class="footer-title">{{ t().footer.contactTitle }}</p>
          <ul class="space-y-0.5 text-sm [&_a]:inline-block [&_a]:py-1.5">
            <li><a [href]="'mailto:' + contact.email">{{ contact.email }}</a></li>
            <li><a [href]="contact.phoneHref">{{ contact.phone }}</a></li>
            <li><a [href]="contact.whatsapp" rel="noopener" target="_blank" class="items-center gap-2.5 !inline-flex"><app-social-icon name="whatsapp" />WhatsApp</a></li>
            <li><a [href]="contact.instagramStudio" rel="noopener" target="_blank" class="items-center gap-2.5 !inline-flex"><app-social-icon name="instagram" />Instagram Studio</a></li>
            <li><a [href]="contact.instagramWeddings" rel="noopener" target="_blank" class="items-center gap-2.5 !inline-flex"><app-social-icon name="instagram" />Instagram {{ t().nav.weddings }}</a></li>
            <li><a [href]="contact.vimeo" rel="noopener" target="_blank" class="items-center gap-2.5 !inline-flex"><app-social-icon name="vimeo" />Vimeo</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-cream/10">
        <div class="mx-auto max-w-6xl px-6 py-6 flex flex-wrap gap-6 justify-between text-xs text-cream/50 tracking-wider">
          <span>© {{ year }} MP Films · Basel</span>
          <span class="flex gap-6 [&>a]:py-2">
            <a [routerLink]="link('contact')">{{ t().nav.contact }}</a>
            <a [routerLink]="link('imprint')">{{ t().footer.imprint }}</a>
            <a [routerLink]="link('privacy')">{{ t().footer.privacy }}</a>
          </span>
        </div>
      </div>
    </footer>
  `,
})
export class Layout {
  readonly lang = input.required<Lang>();
  readonly page = input.required<PageKey>();

  protected readonly langs = LANGS;
  protected readonly hreflang = HREFLANG;
  protected readonly contact = CONTACT;
  protected readonly year = new Date().getFullYear();

  protected readonly t = computed(() => CONTENT[this.lang()]);
  readonly world = computed(() => worldOf(this.page()));
  protected readonly worldName = computed(() => (this.world() === 'weddings' ? 'Weddings' : 'Studio'));
  protected readonly homeLink = computed(() =>
    pagePath(this.lang(), this.world() === 'weddings' ? 'weddings' : 'home'),
  );
  protected readonly navItems = computed<NavItem[]>(() => {
    const n = this.t().nav;
    return this.world() === 'weddings'
      ? [
          { page: 'weddings', label: n.weddings },
          { page: 'latam', label: n.latam },
          { page: 'contact', label: n.contact },
        ]
      : [
          { page: 'home', label: n.studio },
          { page: 'packages', label: n.packages },
          { page: 'work', label: n.work },
          { page: 'about', label: n.about },
          { page: 'contact', label: n.contact },
        ];
  });
  protected readonly switchLink = computed(() =>
    pagePath(this.lang(), this.world() === 'weddings' ? 'home' : 'weddings'),
  );
  protected readonly switchLabel = computed(() =>
    this.world() === 'weddings' ? this.t().nav.toStudio : this.t().nav.toWeddings,
  );

  protected link(page: PageKey): string {
    return pagePath(this.lang(), page);
  }

  protected langLink(l: Lang): string {
    return pagePath(l, this.page());
  }
}
