import "dotenv/config";
import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import router from "./routes/index.routes.js"
import passport from "passport";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import path from "path";
import productModel from "./models/products.models.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.js";
// import { Server } from "socket.io";

const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Servidor abierto en http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("DB conectada");
    const resultados = await productModel.paginate({});
  })
  .catch((error) => console.log("Error en conexion a MongoDB Atlas: ", error));

app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/", router)
app.use("/static", express.static(path.join(__dirname, "/public")));

app.get("/static", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    const info = req.query.info;

    res.render("home", {
      titulo: "Home",
      rutaCSS: "home",
      info,
      products
    });
  } catch (error) {
    res.status(400).send("Error al cargar productos.");
  }
});

app.get("/static/login", (req, res) => {
  res.render("login", {
      titulo: "Iniciar Sesión",
      rutaCSS: "login",
  });
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
