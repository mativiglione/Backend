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
    const { cid, pid } = req.params;
    const cart = await cartManager.getCartById(cid);
  
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
      return;
    }
  
    const productId = parseInt(pid);
    const product = await productManager.getProductById(productId);
  
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
  
    const { quantity } = req.body;
    
    const updatedCart = await cartManager.addProductToCart(cart, product, quantity);
  
    if (updatedCart) {
      res.status(200).send("Producto agregado al carrito correctamente");
    } else {
      res.status(400).send("No se pudo agregar el producto al carrito");
    }
  });

export default routerCart;
