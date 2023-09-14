import { Router } from "express";
import userModel from "../models/users.model.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Error al consultar usuarios: ", error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { nombre, apellido, edad, email, password } = req.body;
    const resultado = await userModel.create({
      nombre,
      apellido,
      edad,
      email,
      password,
    });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send({ error: `Error al crear usuario: ${error}`});
  }
});

export default userRouter;