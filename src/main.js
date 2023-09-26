import "dotenv/config";
import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";
import sessionRouter from "./routes/session.routes.js";
import cartRouter from "./routes/carts.routes.js";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import path from "path";
import productModel from "./models/products.models.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
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
function auth(req, res, next) {
  console.log(req.session.email);

  if (
    req.session.email == "admin@admin.com" &&
    req.session.password == "1234"
  ) {
    return next();
  }

  return res.send("No tenes acceso a este contenido");
}

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter)

app.get("/setCookie", (req, res) => {
  res
    .cookie("CookieCookie", "Esto es el valor de una cookie", {
      maxAge: 60000,
      signed: true,
    })
    .send("Cookie creada");
});

app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Entraste ${req.session.counter} veces a mi pagina`);
  } else {
    req.session.counter = 1;
    res.send("Hola por primera vez");
  }
});

app.get("/static/login", (req, res) => {
  res.render("login", {
      titulo: "Iniciar Sesión",
      rutaCSS: "login",
  });
});

app.get("/admin", auth, (req, res) => {
  res.send("Sos admin");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Salio de la sesion");
  });
});

app.get("/static", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    console.log(products);

    res.render("home", {
      titulo: "Home",
      products: products,
      rutaCSS: "home",
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
