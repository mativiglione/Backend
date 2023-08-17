import { Router } from "express";
import { CartManager } from "../controllers/cartManager.js";
import { ProductManager } from "../controllers/productManager.js";

const productManager = new ProductManager("src/models/productos.txt");
const cartManager = new CartManager("src/models/carts.txt");

const routerCart = Router();

routerCart.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(200).send(newCart);
});

routerCart.get("/:cid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cartId);

  if (cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(400).send("Carrito no encontrado");
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  updatedCart
    ? res.status(200).send(updatedCart)
    : res.status(400).send("Carrito no existe");
});

export default routerCart;
