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

    this.router.get('/location/:coordinates', async (ctx) => {
      let coordinates = ctx.params.coordinates.split(",") as any[];

      coordinates = coordinates.map((coor: string) => parseFloat(coor)) as number[];

      let range = (ctx.query.range? parseFloat(ctx.query.range): 1000);

      let options: any = {};

      try {
        if (ctx.query.options) {
          options = JSON.parse(ctx.query.options);
        }
      } catch (error) {
        console.error(error);
      }

      if (coordinates.length >= 2) {

        let currentPosition = {
          type: "Point",
          coordinates: coordinates.slice(0, 2)
        }

        const result = await this.action.getListByLocation(currentPosition, range, options)

        ctx.body = result;

        return;
      }
      
      ctx.body = {};
    });

  }



}


const _businessRoute = new BusinessRoute();

export const business = _businessRoute.router;