// import express from "express";
// import { promises as fs } from "fs";
// import { ProductManager } from "./Productos.js";

// const app = express();
// const port = 4000;

// const filePath = "./src/products.json";
// const ProductManagerInstance = new ProductManager(filePath);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Pagina inicial");
// });

// app.get("/products", async (req, res) => {
//   const limit = req.query.limit;
//   let products = await ProductManagerInstance.getProducts();

//   if (limit) {
//     const parsedLimit = parseInt(limit, 10);
//     products = products.slice(0, parsedLimit);
//   }

//   res.json(products);
// });

// app.get("/products/:pid", async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   const product = await ProductManagerInstance.getProductById(productId);

//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).json({ error: "Producto no encontrado" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor abierto en http://localhost:${port}`);
// });

import express from "express";
import multer from "multer";
import routerProd from "./routes/products.routes.js";
import { __dirname } from "./path.js";
import path from "path";

const PORT = 8080;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/api/product", routerProd);
// app.use("/api/carts", routerCart);
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Imagen cargada");
});

app.listen(PORT, () => {
  console.log(`Servidor abierto en http://localhost:${PORT}`);
});
