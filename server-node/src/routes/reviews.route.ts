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

  }



}


const _reviewsRoute = new ReviewsRoute();

export const reviews = _reviewsRoute.router;