import { Router } from "express";
import multer from "multer";
import { celebrate, Segments, Joi } from "celebrate";

import uploadConfig from "./config/upload";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";

import OrphanagesController from "./controllers/OrphanagesController";
import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages/:user_id", OrphanagesController.index);
routes.get("/orphanages/:id", ensureAuthenticated, OrphanagesController.show);
routes.post(
  "/orphanages",
  ensureAuthenticated,
  upload.array("images"),
  OrphanagesController.create
);

routes.get("/users", UsersController.index);
routes.get("/users/:id", ensureAuthenticated, UsersController.show);
routes.post("/users", UsersController.create);

routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionsController.create
);

export default routes;
