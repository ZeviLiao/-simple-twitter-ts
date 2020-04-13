import { Router } from "express";

export abstract class mainRoute {
  private path = '/api';
  protected router = Router();
  protected abstract setRoutes(): void;

  public getPrefix() {
    return this.path;
  }

  public getRouter() {
    return this.router;
  }

}
