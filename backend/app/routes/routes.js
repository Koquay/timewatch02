const indexRoutes = require("../index/index.routes");
const productRoutes = require("../product/product.routes");
const authenticationRoutes = require("../authentication/authentication.routes");

module.exports = (app) => {
  app.use("/api/authentication", authenticationRoutes);
  app.use("/api/product", productRoutes);
  app.use("/*", indexRoutes);
};
