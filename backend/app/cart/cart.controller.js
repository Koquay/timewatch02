const cartService = require("./cart.service");

exports.updateCart = async (req, res) => {
  try {
    await cartService.updateCart(req, res);
  } catch (error) {
    throw error;
  }
};

exports.addToCart = async (req, res) => {
  try {
    await cartService.addToCart(req, res);
  } catch (error) {
    throw error;
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    await cartService.deleteCartItem(req, res);
  } catch (error) {
    throw error;
  }
};
