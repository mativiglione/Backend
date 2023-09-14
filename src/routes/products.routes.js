import { Router } from "express";
import productModel from "../models/products.models.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ resultado: "Productos encontrados", message: prods });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos: ${error}` });
  }
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await productModel.findById(id);
    if (prod) res.status(200).send({ resultado: "Producto encontrado", message: prod });
    else res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
});

productRouter.post("/", async (req, res) => {
  const { title, description, stock, code, category, price } = req.body;
  try {
    const respuesta = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
      category,
    });
    res.status(200).send({ resultado: "Producto creado", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, code, category, price, status } = req.body;
  try {
    const respuesta = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      stock,
      code,
      category,
      price,
      status,
    });
    if (respuesta) res.status(200).send({ resultado: "Producto Actualizado", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al actualizar producto: ${error}` });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findByIdAndDelete(id);
    if (prod) res.status(200).send({ resultado: "Producto eliminado", message: prod });
    else res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});

export default productRouter
