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

export const uploadDocuments = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userModel.findById(uid);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const uploadedDocuments = req.files.map((file) => ({
      name: file.originalname,
      reference: file.filename,
      type: file.mimetype,
    }));

    user.documents = [...user.documents, ...uploadedDocuments];

    user.last_connection = new Date();

    await user.save();

    res.status(200).json({ message: "Documentos subidos exitosamente", user });
  } catch (error) {
    res.status(500).json({ error: `Error al subir documentos: ${error}` });
  }
};
