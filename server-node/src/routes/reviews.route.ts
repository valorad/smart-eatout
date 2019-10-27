import * as Router from 'koa-router';

import { ReviewsAction as Action } from "../actions/reviews.action";
import { QueryUtil } from './queryUtil';

class ReviewsRoute {
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

    this.router.get('/bid/:bid', async (ctx) => {
      ctx.body = await this.action.getSingleByBID(ctx.params.bid);
    });

  }



}


const _reviewsRoute = new ReviewsRoute();

export const reviews = _reviewsRoute.router;