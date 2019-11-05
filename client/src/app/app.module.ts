import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

import { appRouter } from './app.router';

import * as secrets from "../environments/secrets.json";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component
  ],
  imports: [
    BrowserModule,

    AgmCoreModule.forRoot({
      apiKey: secrets.mapKey
    }),

    appRouter,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
