import fs from "fs/promises";

export class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.idCounter = 1;
    this.initialize();
  }

  async initialize() {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      this.products = JSON.parse(data);
      this.idCounter = this.calculateIdCounter();
    } catch (error) {}
  }

  calculateIdCounter() {
    const maxId = this.products.reduce(
      (max, product) => Math.max(max, product.id || 0),
      0
    );
    return maxId + 1;
  }

  async writeDataToFile() {
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(this.products, null, 2),
        "utf8"
      );
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
    }
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.idCounter,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    this.idCounter++;
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

const filePath = "./src/products.json";

(async () => {
  const getProducts = new ProductManager(filePath);

  await getProducts.addProduct(
    "EA FC 24",
    "La experiencia futbolística más fiel hasta la fecha.",
    20000,
    "Sin imagen",
    "abc123",
    50
  );

  await getProducts.addProduct(
    "Counter-Strike: Global Offensive",
    "CS:GO amplía el juego de acción por equipos del que fue pionero cuando salió hace más de 20 años.",
    5000,
    "Sin imagen",
    "fgh456",
    0
  );

  await getProducts.addProduct(
    "Street Fighter 6",
    "Street Fighter 6 hace gala de la potencia del RE ENGINE de Capcom, e incluye tres modos de juego: World Tour, Fighting Ground y Battle Hub.",
    17000,
    "Sin imagen",
    "asd656",
    15
  );

  await getProducts.addProduct(
    "NBA 2k24",
    "Experimenta la cultura del baloncesto en NBA 2K24.",
    15000,
    "Sin imagen",
    "jkg656",
    50
  );

  //update de precio en producto 1
  await getProducts.updateProduct(1, "price", 25000);

  //elimino producto 2 por falta de stock
  await getProducts.deleteProduct(2);

  //obtengo los productos
  const allProducts = await getProducts.getProducts();
  console.log("Productos en stock", allProducts);
})();
