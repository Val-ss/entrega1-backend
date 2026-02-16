const express = require("express");
const ProductManager = require("../managers/ProductManager");

const router = express.Router();
const productManager = new ProductManager("../../data/products.json");
router.get("/", (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  res.json({ message: "Producto recibido", data: newProduct });
});

module.exports = router;