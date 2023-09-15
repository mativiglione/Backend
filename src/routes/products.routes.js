import { Router } from "express";
import productModel from "../models/products.models.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    const filters = {};
    if (query) {
      filters.category = query;
    }

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: sort === "asc" ? "price" : sort === "desc" ? "-price" : undefined,
    };

    const result = await productModel.paginate(filters, options);

    const response = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage || null,
      nextPage: result.nextPage || null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevPage
        ? `/api/product?page=${result.prevPage}&limit=${limit}&query=${query}&sort=${sort}`
        : null,
      nextLink: result.nextPage
        ? `/api/product?page=${result.nextPage}&limit=${limit}&query=${query}&sort=${sort}`
        : null,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ status: "error", error: `Error al consultar productos: ${error}` });
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
