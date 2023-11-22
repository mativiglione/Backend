import { Router } from "express";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./users.routes.js";
import loggerRouter from "./logger.routes.js"

const router = Router();

router.use("/api/product", productRouter);
router.use("/api/user", userRouter);
router.use("/api/carts", cartRouter);
router.use("/api/sessions", sessionRouter);
router.use("/",loggerRouter)

export default router;
