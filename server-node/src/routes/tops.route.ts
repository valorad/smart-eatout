import * as Router from 'koa-router';

import { TopsAction as Action } from "../actions/tops.action";

class TopsRoute {
  router = new Router();
  action = new Action();

  /**
   *
   */
  constructor() {

    this.router.get('/', async (ctx) => {
      ctx.body = this.action.getDetail();
    });

    this.router.post('/', async (ctx) => {
      let res = await this.action.add();
      ctx.body = res;
    });

  }



}


const _topsRoute = new TopsRoute();

export const tops = _topsRoute.router;