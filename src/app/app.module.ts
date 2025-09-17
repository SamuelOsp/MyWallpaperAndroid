import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core-module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SharedModule, CoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
