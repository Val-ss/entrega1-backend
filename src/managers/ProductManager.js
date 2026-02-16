const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(data);
  }
}

module.exports = ProductManager;