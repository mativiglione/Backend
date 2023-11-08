import userModel from "../models/users.models.js";
import EErrors from "../services/enums.js";
import { generateUserErrorInfo } from "../services/info.js";

export const registerUser = async (req, res) => {
    try {
      if (!req.user) {
        res.status(400).send({ mensaje: "Usuario ya existente" });
      }
      res.status(200).send({ mensaje: "Usuario creado" });
    } catch (error) {
      res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
    }
  };