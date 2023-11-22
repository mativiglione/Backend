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
    logger.error(
      `[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`
    );
    res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
  }
};
