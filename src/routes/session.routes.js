import { Router } from "express";
import * as sessionController from "../controllers/session.controller.js"
import passport from "passport";


const sessionRouter = Router();

sessionRouter.post("/login", passport.authenticate("login"), sessionController.loginUser);
sessionRouter.get("/testJWT", passport.authenticate("jwt", { session: true }), sessionController.testJWT);
sessionRouter.get('/current', sessionController.getCurrentUser);
sessionRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), sessionController.githubLogin);
sessionRouter.get("/githubSession", passport.authenticate("github"), sessionController.githubSessionLogin);
sessionRouter.post("/logout", sessionController.logoutUser);

export default sessionRouter;

