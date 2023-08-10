import express from "express";
import fs from "fs/promises";

import { ProductManager } from "./Productos.js";

const app = express();
const port = 4000;

const filePath = "./src/products.json";
const ProductManagerInstance = new ProductManager(filePath);

app.use(express.json());

ProductManagerInstance.addProduct(
  "EA FC 24",
  "La experiencia futbolística más fiel hasta la fecha.",
  20000,
  "Sin imagen",
  "abc123",
  50
);

ProductManagerInstance.addProduct(
  "Counter-Strike: Global Offensive",
  "CS:GO amplía el juego de acción por equipos del que fue pionero cuando salió hace más de 20 años.",
  5000,
  "Sin imagen",
  "fgh456",
  0
);

ProductManagerInstance.addProduct(
  "Street Fighter 6",
  "Street Fighter 6 hace gala de la potencia del RE ENGINE de Capcom, e incluye tres modos de juego: World Tour, Fighting Ground y Battle Hub.",
  17000,
  "Sin imagen",
  "asd656",
  15
);

ProductManagerInstance.addProduct(
  "NBA 2k24",
  "Experimenta la cultura del baloncesto en NBA 2K24.",
  15000,
  "Sin imagen",
  "jkg656",
  50
);

ProductManagerInstance.updateProduct(1, "price", 25000);

ProductManagerInstance.deleteProduct(2);

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  let products = ProductManagerInstance.getProducts();

  if (limit) {
    const parsedLimit = parseInt(limit, 3);
    products = products.slice(0, parsedLimit);
  }

  res.json(products);
});

app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = ProductManagerInstance.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor abierto en http://localhost:${port}`);
});
