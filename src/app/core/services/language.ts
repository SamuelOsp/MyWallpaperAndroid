import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class Language {
  private readonly KEY = 'app_lang';
  private readonly SUPPORTED = ['en', 'es'];
  constructor(private translate: TranslateService) {
    
    this.translate.addLangs(this.SUPPORTED);
    this.translate.setDefaultLang('en');

    
    const saved = localStorage.getItem(this.KEY);
    const browser = (this.translate.getBrowserLang() || '').toLowerCase();

    const startLang =
      saved && this.SUPPORTED.includes(saved)
        ? saved
        : this.SUPPORTED.includes(browser)
          ? browser
          : 'en';

    this.use(startLang);
  }

  use(lang: string) {
    if (!this.SUPPORTED.includes(lang)) lang = 'en';
    this.translate.use(lang);
    localStorage.setItem(this.KEY, lang);
  }

  current(): string {
    return this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }

  supported(): string[] {
    return [...this.SUPPORTED];
  }
}
