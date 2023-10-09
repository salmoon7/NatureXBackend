import { signup, login } from "./Controllers/User";

const router = (app) => {
  app.post("/login", login);
  app.post("/signup", signup);
};

export default router;
