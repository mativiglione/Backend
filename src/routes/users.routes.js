import { Router } from "express";
import userModel from "../models/users.models.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const respuesta = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password,
    });
    res.status(200).send({ resultado: "Usuario creado", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear usuario: ${error}` });
  }
});

export default userRouter;
