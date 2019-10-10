import * as Router from 'koa-router';

// sub routes
import { business } from "./business.route";

class API {
  static routerInstance = new Router();

  static get router(): Router {
    
    /* GET api listing. */
    this.routerInstance.get('/', async (ctx) => {
      ctx.status = 200;
      ctx.body = {
        message: "api works!"
      }
    });

    // sub routes
    this.routerInstance.use('/business', business.routes(), business.allowedMethods());
    return this.routerInstance;

  }

}

export const api = API.router;