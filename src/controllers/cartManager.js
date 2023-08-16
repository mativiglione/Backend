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
  async addProductToCart(cart, product, quantity) {
    const cartIndex = this.carts.findIndex((c) => c.id === cart.id);
    if (cartIndex === -1) {
      return false;
    }

    const productIndex = cart.products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ id: product.id, quantity });
    }

    this.carts[cartIndex] = cart;
    await this.saveCarts();
    return true;
  }
  async getProductById(productId) {
    const products = await this.productManager.getProducts();
    return products.find((product) => product.id === productId) || null;
  }
}
