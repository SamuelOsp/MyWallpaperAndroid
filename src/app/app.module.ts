import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core-module';

import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from './core/services/language';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
     SharedModule, 
     CoreModule,
     TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',           
      defaultLanguage: 'en',       
      useDefaultLang: true
    }),
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _lang: Language) {}
}
