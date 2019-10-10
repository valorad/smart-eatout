import * as Router from 'koa-router';

import { UsersAction as Action } from "../actions/users.action";
import { QueryUtil } from './queryUtil';

class UsersRoute {
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


const _usersRoute = new UsersRoute();

export const users = _usersRoute.router;