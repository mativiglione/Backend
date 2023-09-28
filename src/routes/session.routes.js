import { Router } from "express";
import userModel from "../models/users.models.js";
import { validatePassword } from "../utils/bcrypt.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.session) {
        return res.status(401).send({ mensaje: "Invalidate user" });
      }

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };

      res.redirect(`/static?info=${req.session.user.first_name}`);
    } catch (error) {
      res.status(500).send({ mensaje: `Error al iniciar sesion: ${error}` });
    }
  }
);

sessionRouter.get(
  "/github",
  passport.authenticate("github",
  { scope: ["user:email"] }),
  async (req, res) => {
    res.status(200).send({ mensaje: "Usuario creado "})
  }
);

sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  async (Req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Sesion creada" });
  }
);

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
    res.redirect("/static/login");
  } else res.status(401).send({ resultado: "No autorizado" });
});

export default sessionRouter;

// const { email, password } = req.body;

//   try {
//     if (req.session.login)
//       res.status(200).send({ resultado: "Login existente" });
//     const user = await userModel.findOne({ email: email });
//     if (user) {
//       if (validatePassword(password, user.password)) {
//         req.session.login = true;
//         res.redirect("/static");
//       } else {
//         res.status(401).send({ resultado: "No autorizado", message: user });
//       }
//     } else {
//       res.status(404).send({ resultado: "No encontrado", message: user });
//     }
//   } catch (error) {
//     res.status(400).send({ error: `Error en login: ${error}` });
//   }
