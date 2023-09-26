import { Router } from "express";
import userModel from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.session.login)
      res.status(200).send({ resultado: "Login existente" });
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        req.session.login = true;
        req.session.user = user;
        console.log(req.session);
        res.redirect("/static");
      } else {
        res.status(401).send({ resultado: "No autorizado", message: user });
      }
    } else {
      res.status(404).send({ resultado: "No encontrado", message: user });
    }
  } catch (error) {
    res.status(400).send({ error: `Error en login: ${error}` });
  }
});

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
    res.redirect("/static/login");
  } else res.status(401).send({ resultado: "No autorizado" });
});

export default sessionRouter;
