import UserController from "./usersControllers";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", UserController.getAllUsers);

export default usersRouter;