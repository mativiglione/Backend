const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.readDataFromFile() || [];
  }

  readDataFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  writeDataToFile() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, data, 'utf8');
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.products.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    this.products.push(product);
    this.writeDataToFile();
  }

  updateProduct(id, field, value) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      product[field] = value;
      this.writeDataToFile();
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.writeDataToFile();
      console.log("Producto borrado");
    } else {
      console.log("Producto no encontrado");
    }
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
  }
}

const filePath = './products.json';

const getProducts = new ProductManager(filePath);

getProducts.addProduct(
  "Remera",
  "Remera clásica color negro.",
  5000,
  "Sin imagen",
  "abc123",
  20
);

getProducts.addProduct(
  "Camisa",
  "Camisa clásica color blanco.",
  7000,
  "Sin imagen",
  "fgh456",
  10
);

getProducts.deleteProduct(1);

const allProducts = getProducts.getProducts();
console.log("Productos después de eliminar:", allProducts);
