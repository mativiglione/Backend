import express from 'express';
import fs from 'fs/promises';

import { ProductManager } from './Productos.js';

const app = express();
const port = 4000;

const filePath = './src/products.json';
const ProductManagerInstance = new ProductManager(filePath);

app.use(express.json());

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    let products = await ProductManagerInstance.getProducts();

    if (limit) {
      const parsedLimit = parseInt(limit, 5);
      products = products.slice(0, parsedLimit);
    }

    res.json(products);
  });

  app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = ProductManagerInstance.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });

  app.listen(port, () => {
    console.log(`Servidor abierto en http://localhost:${port}`);
  });