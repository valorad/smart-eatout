import * as Router from 'koa-router';

import { TopsAction as Action } from "../actions/tops.action";

class TopsRoute {
  router = new Router();
  action = new Action();

  /**
   *
   */
  constructor() {

    // this.router.get('/', async (ctx) => {
    //   ctx.body = this.action.getDetail();
    // });

    this.router.get('/:businessIDs', async (ctx) => {
      
      let businessIDs: string[] = ctx.params.businessIDs.split(",");
      // remove empty strings
      businessIDs = businessIDs.filter(ele => ele[0]);

      
      ctx.body = await this.action.getTop(businessIDs);
      // ctx.body = businessIDs;
    });

    // this.router.post('/', async (ctx) => {
    //   let res = await this.action.add();
    //   ctx.body = res;
    // });

  }



}


const _topsRoute = new TopsRoute();

export const tops = _topsRoute.router;