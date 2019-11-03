import { RouterModule, Route } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index', 
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: '**',
    component: Http404Component
  }
];

export const appRouter = RouterModule.forRoot(appRoutes, { useHash: true });