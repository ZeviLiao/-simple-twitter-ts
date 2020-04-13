import * as express from "express";
import * as bodyParser from "body-parser";
import { router } from "./routes/router";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from 'mongoose';

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost:27019/CRMdb';

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // for (const route of router) {
    //   this.app.use(route.getPrefix(), route.getRouter());
    // }
  }

  private mongoSetup(): void {
    require('mongoose').Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}

export default new App().app;