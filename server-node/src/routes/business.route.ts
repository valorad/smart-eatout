import * as Router from 'koa-router';

import { BusinessAction as Action } from "../actions/business.action";
import { QueryUtil } from './queryUtil';

class BusinessRoute {
  router = new Router();
  action = new Action();
  query = new QueryUtil(this.action);

  /**
   *
   */
  constructor() {

    this.router.get('/', async (ctx) => {
      ctx.body = await this.query.getList(ctx.query);
    });

  }



}


const _businessRoute = new BusinessRoute();

export const business = _businessRoute.router;