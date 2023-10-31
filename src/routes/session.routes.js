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

// sessionRouter.post(
//   "/login",
//   passport.authenticate("login"),
//   async (req, res) => {
//     try {
//       if (!req.session) {
//         return res.status(401).send({ mensaje: "Invalidate user" });
//       }

//       req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email,
//       };

//       const token = generateToken(req.user)
//       res.cookie("jwtCookie", token, {
//         maxAge: 43200000

//       })

//       res.redirect(`/static?info=${req.session.user.first_name}`);
//     } catch (error) {
//       res.status(500).send({ mensaje: `Error al iniciar sesion: ${error}` });
//     }
//   }
// );

// sessionRouter.get(
//   "/testJWT",
//   passport.authenticate("jwt", { session: true }),  (req, res) => {
//     res.status(200).send({mensaje: req.user});
//   }
// );

// sessionRouter.get('/current', passportError('jwt'), authorization('user'), (req, res) => {
//   res.send(req.user)
// })

// sessionRouter.get(
//   "/github",
//   passport.authenticate("github", { scope: ["user:email"] }),
//   async (req, res) => {
//     res.status(200).send({ mensaje: "Usuario creado " });
//     req.session.user = {
//       first_name: req.user.user.first_name,
//       last_name: req.user.user.last_name,
//       age: req.user.user.age,
//       email: req.user.user.email
//     }
//   }
// );

// sessionRouter.get(
//   "/githubSession",
//   passport.authenticate("github"),
//   async (Req, res) => {
//     req.session.user = req.user;
//     res.status(200).send({ mensaje: "Sesion creada" });
//   }
// );

// sessionRouter.post("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy();
//     res.clearCookie("jwtCookie")
//     res.redirect("/static/login");
//   } else res.status(401).send({ resultado: "No autorizado" });
// });



