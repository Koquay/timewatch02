const chalk = require("chalk");
const productService = require("./product.service");

exports.getProducts = async (req, res) => {
  // console.log(chalk.blue("PRODUCT CONTROLLER GET PRODUCTS"));
  try {
    await productService.getProducts(req, res);
  } catch (error) {
    throw error;
  }
};

exports.getProductsByCategory = async (req, res) => {
  // console.log(chalk.blue("PRODUCT CONTROLLER GET PRODUCTS By CATEGORY"));
  try {
    await productService.getProductsByCategory(req, res);
  } catch (error) {
    throw error;
  }
};
