const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Carrito creado" });
});

module.exports = router;