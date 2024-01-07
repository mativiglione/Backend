import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import passport from "passport";
import multer from "multer";

const userRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;

    if (file.mimetype.startsWith("image/")) {
      folder = "profiles";
    } else if (file.mimetype.startsWith("application/pdf")) {
      folder = "documents";
    } else {
      folder = "products";
    }

    cb(null, `./uploads/${folder}`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

const upload = multer({ storage });

userRouter.post(
  "/:uid/documents",
  upload.array("documents"),
  userController.uploadDocuments
);
userRouter.post(
  "/",
  passport.authenticate("register"),
  userController.registerUser
);

export default userRouter;
