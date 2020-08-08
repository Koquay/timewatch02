const router = require("express").Router();
const productController = require("./product.controller");

router.get("/", productController.getProducts);
router.get("/2/", productController.getProductsByCategory);

module.exports = router;
