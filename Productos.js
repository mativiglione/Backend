class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    this.products.push(product);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.code === id);

    if (product) {
      return product;
    } else {
      console.log("Not found");
    }
  }
}

const getProducts = new ProductManager();

getProducts.addProduct(
  "Remera",
  "Remera clásica color negro.",
  5000,
  "Sin imagen",
  "001",
  20
);

const productFound = getProducts.getProductById("001");
console.log("Producto encontrado:", productFound);

getProducts.getProductById("002");

