import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const cartRouter = Router();


cartRouter.get("/", cartController.getCarts);
cartRouter.post("/",  cartController.createCart);
cartRouter.get("/:cid", cartController.getCart);
cartRouter.post("/:cid/product/:pid", passportError('jwt'), authorization('User'),cartController.addToCart);
cartRouter.delete("/:cid/product/:pid", cartController.removeFromCart);
cartRouter.put("/:cid", cartController.updateCart);
cartRouter.put("/:cid/product/:pid", cartController.updateProductInCart);
cartRouter.delete("/:cid", cartController.clearCart);
cartRouter.post("/:cid/purchase", cartController.completePurchase);

export default cartRouter;