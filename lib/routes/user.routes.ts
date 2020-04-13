import { Application as ExpressApplication, Request, Response, Router } from 'express';
import { mainRoute } from './route.abstract';
import { ContactController } from "../controllers/crmController";

export class userRoutes extends mainRoute {

  public contactController: ContactController = new ContactController();

  constructor() {
    super();
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get('/test', (req: Request, res: Response) => {
      res.status(200).send('you called user path test!')
    });

    this.router.route('/contact')
      .get(this.contactController.getContacts)
      .post(this.contactController.addNewContact);
  }

  // public routes(app: ExpressApplication): void {
  //   app.route('/')
  //     .get((req: Request, res: Response) => {
  //       res.status(200).send('you called user path!')
  //     });
  // }
}