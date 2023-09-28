import { Router } from "express";
import userModel from "../models/users.models.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";

const userRouter = Router();

userRouter.post("/", passport.authenticate("register"), async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).send({ mensaje: "Usuario ya existente" });
    }
    res.status(200).send({ mensaje: "Usuario creado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
  }
});

export default userRouter;

// const { first_name, last_name, age, email, password } = req.body;
//   try {
//     const hashPassword = createHash(password)
//     const respuesta = await userModel.create({
//       first_name: first_name,
//       last_name: last_name,
//       age: age,
//       email: email,
//       password: hashPassword,
//     });
//     res.status(200).send({ resultado: "Usuario creado", message: respuesta });
//   } catch (error) {
//     res.status(400).send({ error: `Error al crear usuario: ${error}` });
//   }
