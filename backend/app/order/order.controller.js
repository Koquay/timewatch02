const orderService = require("./order.service");

exports.placeOrder = async (req, res) => {
  try {
    await orderService.placeOrder(req, res);
  } catch (error) {
    throw error;
  }
};
