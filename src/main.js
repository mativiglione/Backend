import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import path from "path";
import productModel from "./models/products.models.js";
import cartModel from "./models/carts.models.js";
import cookieParser from "cookie-parser";

const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Servidor abierto en http://localhost:${PORT}`);
});

// const io = new Server(server);
// const mensajes = [];

// io.on("connection", (socket) => {
//   console.log("Conexion con Socket.io");

//   socket.on("nuevoProducto", async (prod) => {
//     console.log(prod);
//     await productManager.addProduct(prod);
//     const products = await productManager.getProducts();
//     socket.emit("products", products);
//   });

//   socket.on("mensaje", (info) => {
//     console.log(info);
//     mensajes.push(info);
//     io.emit("mensajes", mensajes);
//   });
// });

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("DB conectada");
    const resultados = await productModel.paginate({});
  })
  .catch((error) => console.log("Error en conexion a MongoDB Atlas: ", error));

// index por categoria
// const resultados = await productModel.find({ category: "Deportes" }).explain('executionStats')
// console.log(resultados)

app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/static", express.static(path.join(__dirname, "/public")));

app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);

app.get("/setCookie", (req, res) => {
  res
    .cookie("CookieCookie", "Esto es el valor de una cookie", {
      maxAge: 60000,
      signed: true,
    })
    .send("Cookie creada");
});

app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies); // CONSULTAR SOLO LAS COOKIES FIRMADAS
  // res.send(req.cookies) CONSULTAR TODAS LAS COOKIES
});

app.get("/static", async (req, res) => {
  try {
    const products = await productModel.find().lean;
    console.log(products);

    res.render("home", {
      titulo: "Home",
      products: products,
    });
  } catch (error) {
    res.status(400).send("Error al cargar productos.");
  }
});

// app.get("/static/realTimeProducts", (req, res) => {
//   res.render("realTimeProducts", {
//     titulo: "Productos",
//     rutaCSS: "realTimeProducts",
//     rutaJS: "realTimeProducts",
//   });
// });

// app.get("/static/chat", async (req, res) => {
//   res.render("chat", {
//     titulo: "Chat",
//     rutaJS: "chat",
//     rutaCSS: "chat",
//   });
// });
