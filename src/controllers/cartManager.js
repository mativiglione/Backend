import { promises as fs } from "fs";

export class CartManager {
  constructor(path, productManager) {
    this.carts = [];
    this.path = path;
    this.productManager = productManager;
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async createCart() {
    const newCart = {
      id: CartManager.incrementarID(),
      products: [],
    };

    const carts = await this.getCarts();
    carts.push(newCart);
    await this.writeFile(carts);

    return newCart;
  }

  async getCarts() {
    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return carts;
  }

  async writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === id);

    return cart || null;
  }
  async addProductToCart(cid, pid) {
    const cart = await this.getCartById(cid);
    const products = JSON.parse(
      await fs.readFile("./src/models/productos.txt", "utf-8")
    );
    const product = products.find((product) => product.id === pid);
    if (product) {
      const productExist = cart.products.find((prod) => prod.id === pid);
      productExist
        ? productExist.quantity++
        : cart.products.push({ id: product.id, quantity: 1 });
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(
        (existingCart) => existingCart.id === cart.id
      );
      if (cartIndex !== -1) {
        carts[cartIndex] = cart;
        await fs.writeFile(this.path, JSON.stringify(carts));
      }
      return cart;
    } else {
      console.log("El producto no existe");
      return false;
    }
  }
}
