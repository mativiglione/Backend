import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const productRouter = Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post('/', passportError('jwt'), authorization('Admin'), productController.postProduct);
productRouter.put("/:id", passportError('jwt'), authorization('Admin'), productController.putProduct);
productRouter.delete("/:id", passportError('jwt'), authorization('Admin'), productController.deleteProduct);

export default productRouter