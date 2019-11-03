import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

import { appRouter } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component
  ],
  imports: [
    BrowserModule,

    appRouter
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
