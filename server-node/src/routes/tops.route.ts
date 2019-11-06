import * as Router from 'koa-router';

import { TopsAction as Action } from "../actions/tops.action";
import { DateForm } from '../utils/dateForm';

class TopsRoute {
  router = new Router();
  action = new Action();
  dateF = new DateForm();

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



      let startDate: Date | undefined = new Date(ctx.query.startDate);
      let endDate: Date | undefined = new Date(ctx.query.endDate);

      if (!this.dateF.isDateValid(startDate)) { startDate = undefined; }
      if (!this.dateF.isDateValid(endDate)) { endDate = undefined; }

      ctx.body = await this.action.getTop(businessIDs, startDate, endDate);
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