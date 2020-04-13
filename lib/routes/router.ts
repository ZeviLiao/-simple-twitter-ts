import { mainRoute } from "./route.abstract";
import { userRoutes } from "./user.routes";

export const router: Array<mainRoute> = [
  new userRoutes(),
];