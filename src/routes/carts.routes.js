import { Router } from "express";
import cartModel from "../models/carts.models.js";

const cartRouter = Router();

cartRouter.post("/", async (reseq, res) => {
    try{
      const newCart = await cartModel.create({ products: [] })
      res.status(200).send({ resultado: "Nuevo carrito creado", message: newCart})
    } catch (error) {
        res.status(400).send({ error: `Error al crear el nuevo carrito: ${error}`})
    }
})

cartRouter.get("/:cid", async (req,res) => {
  const { cid } = req.params;
  try{
    const cart = await cartModel.findById(cid);
    res.status(200).send({ resultado: "Carrito encontrado", message: cart});
  } catch (error) {
    res.status(400).send({ error: `Error al buscar el carrito: ${error}` });
  }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      cart.products.products.push({ id_prod: pid, quantity: quantity });
      const respuesta = await cartModel.findByIdAndUpdate(cid, cart); //actualizo carrito de la BDD con el nuevo prod
      res.status(200).send({ respuesta: "Producto agregado al carrito", mensaje: respuesta });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al agregar el producto: ${error}` });
  }
});

export default cartRouter
