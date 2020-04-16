import MainRoute from "./route.abstract";
import UserRoutes from "./user.routes";

const router: Array<MainRoute> = [
  new UserRoutes(),
];

export default router;