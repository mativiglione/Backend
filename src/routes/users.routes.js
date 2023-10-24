import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import passport from "passport";

const userRouter = Router();

userRouter.post("/", passport.authenticate("register"), registerUser);

export default userRouter;