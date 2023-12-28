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
import { faker } from "@faker-js/faker";
import loggerTestRouter from "./routes/logger.routes.js"
import { requestLogger } from "./middlewares/requestLogger.js";//Importo el meddleware que va a logear cada llamada por consola.
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
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
app.use(requestLogger)//---------------------------------Aca aplico el middleware

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


const modelProduct = () => {
  return {
     _id: faker.database.mongodbObjectId(),
     title: faker.commerce.product(),
     description: faker.commerce.productDescription(),
     category: faker.commerce.productAdjective(),
     stock: faker.number.binary(),
     price: faker.commerce.price({ min: 100, max: 200 }),
     code: faker.lorem.word(5),

  }
}
const createRandomProduct = (cantProducts) => {
  const products = []

  for(let i = 0; i < cantProducts; i++) {
    products.push(modelProduct())
  }

  return products
}

app.get("/mockingproducts", (req,res) => {
  const products = createRandomProduct(100);
  res.json(products);
})

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion del curso de Backend",
      description: "API Coderhouse Backend",
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

// ** = cualquier subcarpeta
// * = cualquier nombre de archivo

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
