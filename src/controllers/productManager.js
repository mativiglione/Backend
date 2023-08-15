import { promises as fs } from "fs";

export class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async getProducts() {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return prods;
  }

  async addProduct(prod) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const existProd = prods.find((producto) => producto.code === prod.code);

    if (existProd) {
      return false;
    } else {
      prod.id = ProductManager.incrementarID();
      prods.push(prod);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    }
  }
  async getProductById(id) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = prods.find((producto) => producto.id === id);

    return product || null;
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.find((product) => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct};
      await fs.writeFile(this.path, JSON.stringify(products));
      return true;
    } else {
      return false;
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const index = prods.findIndex((producto) => producto.id === id);
  
    if (index !== -1) {
      prods.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    } else {
      return false;
    }
  }
}
