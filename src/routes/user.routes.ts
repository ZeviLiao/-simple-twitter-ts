import { Application as ExpressApplication, Request, Response, Router } from 'express';
import MainRoute from './route.abstract';
import UserController from "../controllers/userController";

class UserRoutes extends MainRoute {
  private userController: UserController = new UserController();

  constructor() {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/test', (req: Request, res: Response) => {
      res.status(200).send('you called user path test!')
    });

    this.router.route('/user')
      .get(this.userController.getAll)
      .post(this.userController.createOne);

    this.router.route('/user/:id')
      .get(this.userController.getOne)
      .put(this.userController.updateOne)
      .delete(this.userController.deleteOne);
  }
}

export default UserRoutes;