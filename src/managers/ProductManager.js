const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const newId =
      products.length === 0
        ? 1
        : products[products.length - 1].id + 1;

    const newProduct = {
      id: newId,
      ...product
    };

    products.push(newProduct);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, 2)
    );

    return newProduct;
  }

  async getProductById(pid) {
    const products = await this.getProducts();

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === pid) {
        return products[i];
      }
    }

    return null;
  }

  async updateProduct(pid, updatedFields) {
  const products = await this.getProducts();

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === pid) {

      products[i] = {
        ...products[i],
        ...updatedFields,
        id: products[i].id
      };

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2)
      );

      return products[i];
    }
  }

  return null;
  }

  async deleteProduct(pid) {
  const products = await this.getProducts();

  const newProducts = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].id !== pid) {
      newProducts.push(products[i]);
    }
  }

  if (newProducts.length === products.length) {
    return null;
  }

  await fs.promises.writeFile(
    this.path,
    JSON.stringify(newProducts, null, 2)
  );

  return true;
  }

  async deleteProduct(pid) {
    const products = await this.getProducts();

    let newProducts = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].id !== pid) {
        newProducts.push(products[i]);
      }
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newProducts, null, 2)
    );

    return true;
  }

  async updateProduct(pid, updatedFields) {
  const products = await this.getProducts();

  let productFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === pid) {
      // Mantiene el id original
      const idOriginal = products[i].id;

      // Actualiza los campos (menos el id)
      products[i] = {
        id: idOriginal,
        ...products[i],
        ...updatedFields
      };

      productFound = true;
      break;
    }
  }

  if (!productFound) {
    return null;
  }

  await fs.promises.writeFile(
    this.path,
    JSON.stringify(products, null, 2)
  );

  return products;
}
}

module.exports = ProductManager;