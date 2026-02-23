const express = require('express');
const router = express.Router();

const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager('./data/products.json');




router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.getProducts();

  const product = products.find(p => p.id == pid);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});


router.post('/', async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  } = req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    status === undefined ||
    !stock ||
    !category
  ) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const newProduct = await productManager.addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails: thumbnails || []
  });

  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const updatedFields = req.body;

  const updatedProduct = await productManager.updateProduct(pid, updatedFields);

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json({
    message: 'Producto actualizado',
    product: updatedProduct
  });
});

router.put('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const updatedFields = req.body;

  const updatedProduct = await productManager.updateProduct(pid, updatedFields);

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json({ message: 'Producto actualizado correctamente' });
});


router.delete('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);

  const product = await productManager.getProductById(pid);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  await productManager.deleteProduct(pid);

  res.json({ message: 'Producto eliminado correctamente' });
});

module.exports = router;