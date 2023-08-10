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
    } catch (error) {
      console.error("Error al inicializar", error);
    }
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
}
