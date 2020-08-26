const indexRoutes = require("../index/index.routes");
const productRoutes = require("../product/product.routes");
const authenticationRoutes = require("../authentication/authentication.routes");
const cartRoutes = require("../cart/cart.routes");
const orderRoutes = require("../order/order.routes");

module.exports = (app) => {
  app.use("/api/order", orderRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/authentication", authenticationRoutes);
  app.use("/api/product", productRoutes);
  app.use("/*", indexRoutes);
};
