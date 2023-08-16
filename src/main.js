import express from "express";
import multer from "multer";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js"
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
app.use("/api/carts", routerCart);
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Imagen cargada");
});

app.listen(PORT, () => {
  console.log(`Servidor abierto en http://localhost:${PORT}`);
});
