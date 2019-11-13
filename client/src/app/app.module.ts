import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { BusinessListComponent } from './business-list/business-list.component';

import { LibModule } from './_lib/lib.module';

import { appRouter } from './app.router';

import * as secrets from "../environments/secrets.json";
import { TopComponent } from './top/top.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component,
    BusinessListComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    AgmCoreModule.forRoot({
      apiKey: secrets.mapKey
    }),

    LibModule,

    appRouter,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
