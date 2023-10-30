import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import passport from "passport";

const userRouter = Router();

userRouter.post("/", passport.authenticate("register"), userController.registerUser);

export default userRouter;