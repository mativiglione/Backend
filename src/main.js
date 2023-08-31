import express from "express";
import multer from "multer";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import { __dirname } from "./path.js";
import path from "path";
import { ProductManager } from "./controllers/productManager.js";

const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Servidor abierto en http://localhost:${PORT}`);
});

const io = new Server(server);
const productManager = new ProductManager("src/models/productos.txt");
const mensajes = [];

io.on("connection", (socket) => {
  console.log("Conexion con Socket.io");

  socket.on("nuevoProducto", async (prod) => {
    console.log(prod);
    await productManager.addProduct(prod);
    const products = await productManager.getProducts();
    socket.emit("products", products);
  });

  socket.on("mensaje", (info) => {
    console.log(info);
    mensajes.push(info);
    io.emit("mensajes", mensajes);
  });
});

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
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/api/product", routerProd);
app.use("/api/carts", routerCart);

app.get("/static", async (req, res) => {
  const prods = await productManager.getProducts();

  res.render("home", {
    titulo: "Home",
    rutaCSS: "home",
    rutaJS: "home",
    products: prods,
  });
});

app.get("/static/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    titulo: "Productos",
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
});

app.get("/static/chat", async (req, res) => {
  res.render("chat", {
    titulo: "Chat",
    rutaJS: "chat",
    rutaCSS: "chat",
  });
});

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Imagen cargada");
});
