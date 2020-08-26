const router = require("express").Router();
const cartController = require("./cart.controller");

router.put("/2", cartController.addToCart);
router.post("/", cartController.updateCart);
router.delete("/", cartController.deleteCartItem);

module.exports = router;
