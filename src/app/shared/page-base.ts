import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONTENT } from '../i18n/content';
import { Lang, PageKey, pagePath, pageUrl } from '../i18n/pages';
import { Seo } from '../seo.service';

/** Shared setup for every page: language from the route, texts and link helper. */
export abstract class PageBase {
  protected readonly lang = inject(ActivatedRoute).snapshot.data['lang'] as Lang;
  protected readonly t = CONTENT[this.lang];
  protected readonly seo = inject(Seo);

  protected link(page: PageKey): string {
    return pagePath(this.lang, page);
  }

  protected url(page: PageKey): string {
    return pageUrl(this.lang, page);
  }
}
