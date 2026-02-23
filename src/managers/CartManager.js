const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newId =
      carts.length === 0
        ? 1
        : carts[carts.length - 1].id + 1;

    const newCart = {
      id: newId,
      products: []
    };

    carts.push(newCart);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(carts, null, 2)
    );

    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.getCarts();

    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id === cid) {
        return carts[i];
      }
    }

    return null;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();

    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id === cid) {

        const cart = carts[i];
        let productFound = false;

        for (let j = 0; j < cart.products.length; j++) {
          if (cart.products[j].product === pid) {
            cart.products[j].quantity++;
            productFound = true;
            break;
          }
        }

        if (!productFound) {
          cart.products.push({
            product: pid,
            quantity: 1
          });
        }

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, 2)
        );

        return cart;
      }
    }

    return null;
  }
}

module.exports = CartManager;