import cartModel from "../models/carts.models.js";

export const getCarts = async (req, res) => {
    try {
      const carts = await cartModel.find();
      res.status(200).send(carts);
    } catch (error) {
      res.status(400).send("Carrito no existe");
    }
  };

export const createCart = async (req, res) => {
    try {
      const newCart = await cartModel.create({ products: [] });
      res.status(200).send({ resultado: "Nuevo carrito creado", message: newCart });
    } catch (error) {
      res.status(400).send({ error: `Error al crear el nuevo carrito: ${error}` });
    }
  };

export const getCart = async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartModel.findById(cid);
      res.status(200).send({ resultado: "Carrito encontrado", message: cart });
    } catch (error) {
      res.status(400).send({ error: `Error al buscar el carrito: ${error}` });
    }
  };

export const addToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        cart.products.push({ id_prod: pid, quantity: quantity });
        const updatedCart = await cart.save();
  
        res.status(200).send({
          respuesta: "Producto agregado al carrito",
          mensaje: updatedCart,
        });
      } else {
        res.status(404).send({ respuesta: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(400).send({ error: `Error al agregar el producto: ${error}` });
    }
  };

  export const removeFromCart = async (req, res) => {
    const { cid, pid } = req.params;
  
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        cart.products = cart.products.filter(
          (product) => product.id_prod.toString() !== pid
        );
  
        const updatedCart = await cart.save();
  
        res.status(200).send({
          respuesta: "Producto eliminado del carrito",
          mensaje: updatedCart,
        });
      } else {
        res.status(404).send({ respuesta: "Carrito no encontrado" });
      }
    } catch (error) {
      res
        .status(400)
        .send({ error: `Error al eliminar el producto del carrito: ${error}` });
    }
  };


  export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const products = req.body;
  
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        products.forEach((product) => {
          const existingProduct = cart.products.find(
            (p) => p.id_prod.toString() === product.id_prod
          );
  
          if (existingProduct) {
            existingProduct.quantity += product.quantity;
          } else {
            cart.products.push(product);
          }
        });
  
        const updatedCart = await cart.save();
  
        res.status(200).send({
          resultado: "Carrito actualizado",
          message: updatedCart,
        });
      } else {
        res.status(404).send({ respuesta: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(400).send({ error: `Error al actualizar el carrito: ${error}` });
    }
  };


  export const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        const productToUpdate = cart.products.find(
          (product) => product.id_prod.toString() === pid
        );
  
        if (productToUpdate) {
          productToUpdate.quantity = quantity;
        }
  
        const updatedCart = await cart.save();
  
        res.status(200).send({
          respuesta: "Cantidad del producto actualizada en el carrito",
          mensaje: updatedCart,
        });
      } else {
        res.status(404).send({ respuesta: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(400).send({
        error: `Error al actualizar la cantidad del producto en el carrito: ${error}`,
      });
    }
  };

  export const clearCart = async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await cartModel.findById(cid);
  
      if (cart) {
        cart.products = [];
        const updatedCart = await cart.save();
  
        res.status(200).send({
          respuesta: "Todos los productos fueron eliminados del carrito",
          message: updatedCart,
        });
      } else {
        res.status(404).send({ respuesta: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(400).send({
        error: `Error al eliminar todos los productos del carrito: ${error}`,
      });
    }
  };