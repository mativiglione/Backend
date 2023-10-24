import { Router } from "express";
import {
  getCarts,
  createCart,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  updateProductInCart,
  clearCart,
} from "../controllers/cart.controller.js";

const cartRouter = Router();


cartRouter.get("/", getCarts);
cartRouter.post("/", createCart);
cartRouter.get("/:cid", getCart);
cartRouter.post("/:cid/product/:pid", addToCart);
cartRouter.delete("/:cid/product/:pid", removeFromCart);
cartRouter.put("/:cid", updateCart);
cartRouter.put("/:cid/product/:pid", updateProductInCart);
cartRouter.delete("/:cid", clearCart);

export default cartRouter;


// cartRouter.get("/", async (req, res) => {
//   try {
//     const carts = await cartModel.find();
//     res.status(200).send(carts);
//   } catch (error) {
//     res.status(400).send("Carrito no existe");
//   }
// });
// cartRouter.post("/", async (req, res) => {
//   try {
//     const newCart = await cartModel.create({ products: [] });
//     res
//       .status(200)
//       .send({ resultado: "Nuevo carrito creado", message: newCart });
//   } catch (error) {
//     res
//       .status(400)
//       .send({ error: `Error al crear el nuevo carrito: ${error}` });
//   }
// });

// cartRouter.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const cart = await cartModel.findById(cid);
//     res.status(200).send({ resultado: "Carrito encontrado", message: cart });
//   } catch (error) {
//     res.status(400).send({ error: `Error al buscar el carrito: ${error}` });
//   }
// });

// cartRouter.post("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   const { quantity } = req.body;
//   try {
//     const cart = await cartModel.findById(cid);
//     if (cart) {
//       cart.products.products.push({ id_prod: pid, quantity: quantity });
//       const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
//       res.status(200).send({
//         respuesta: "Producto agregado al carrito",
//         mensaje: respuesta,
//       });
//     }
//   } catch (error) {
//     res.status(400).send({ error: `Error al agregar el producto: ${error}` });
//   }
// });

// cartRouter.delete("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     const cart = await cartModel.findById(cid);
//     if (cart) {
//       const indice = cart.products.products.findIndex(
//         (prod) => prod.id_prod._id == pid
//       );
//       if (indice != -1) {
//         cart.products.products.splice(indice, 1);
//       }
//       const respuesta = await cart.save();
//       res.status(200).send({
//         respuesta: "Producto eliminado del carrito",
//         mensaje: respuesta,
//       });
//     } else {
//       res.status(404).send({ respuesta: "Carrito no encontrado" });
//     }
//   } catch (error) {
//     res
//       .status(400)
//       .send({ error: `Error al eliminar el producto del carrito: ${error}` });
//   }
// });

// cartRouter.put("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   const products = req.body;
//   try {
//     const cart = await cartModel.findById(cid);
//     if (cart) {
//       products.forEach((product) => {
//         const prod = cart.products.products.find(
//           (p) => p.id_prod._id == product.id_prod
//         );
//         if (prod) {
//           prod.quantity += product.quantity;
//         } else {
//           cart.products.products.push(product);
//         }
//       });
//       const respuesta = await cart.save();
//       res
//         .status(200)
//         .send({ resultado: "Carrito actualizado", message: respuesta });
//     } else {
//       res.status(404).send({ respuesta: "Carrito no encontrado" });
//     }
//   } catch (error) {
//     res.status(400).send({ error: `Error al actualizar el carrito: ${error}` });
//   }
// });

// cartRouter.put("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   const { quantity } = req.body;
//   try {
//     const cart = await cartModel.findById(cid);
//     if (cart) {
//       const productIndex = cart.products.products.findIndex(
//         (product) => product.id_prod._id == pid
//       );
//       if (productIndex !== -1) {
//         cart.products.products[productIndex].quantity = quantity;
//       }
//       const respuesta = await cart.save();
//       res.status(200).send({
//         respuesta: "Cantidad del producto actualizada en el carrito",
//         menssage: respuesta,
//       });
//     } else {
//       res.status(404).send({ respuesta: "Carrito no encontrado" });
//     }
//   } catch (error) {
//     res.status(400).send({
//       error: `Error al actualizar la cantidad del producto en el carrito: ${error}`,
//     });
//   }
// });

// cartRouter.delete("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const cart = await cartModel.findById(cid);
//     if (cart) {
//       cart.products.products = [];
//       const respuesta = await cart.save();
//       res.status(200).send({
//         respuesta: "Todos los productos fueron eliminados del carrito",
//         message: respuesta,
//       });
//     } else {
//       res.status(404).send({ respuesta: "Carrito no encontrado" });
//     }
//   } catch (error) {
//     res.status(400).send({
//       error: `Error al eliminar todos los productos del carrito: ${error}`,
//     });
//   }
// });

// export default cartRouter;
