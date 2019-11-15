import { join, resolve } from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as send from 'koa-send';
import * as serve from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as cors from "@koa/cors";

import { api } from './routes/index';

import { ConfigLoader } from './utils/configLoader';
import { DataBase } from "./database/index";

const app = new Koa();

let config = new ConfigLoader("smartEatout.json").config();

// handling config
if (config) {
  let port: number = config.koa.port;

  const router = new Router();

  const clientPath = resolve(__dirname, "./statics/client");
  
  app.use(logger());
  app.use(cors());
  app.use(bodyParser());
  app.use(serve(clientPath));
  app.use(serve(resolve(__dirname, "./statics")));
  
  // root route and sub route settings
  
  router.use('/api', api.routes(), api.allowedMethods())
  router.get('/', async (ctx) => {
    await send(ctx, join(clientPath, 'index.html'), { root: '/' });
  });
  
  app.use(router.routes())
  .use(router.allowedMethods());

  const db = new DataBase();
  db.connect();

  // listen
  app.listen(port, () => {
    console.log(`** koa started on port ${port}. **`);
  });

} else {
  console.error("Invalid config detected, program shutting down");
  process.exit(-1);
}

export default app;








