const configureMiddleware = require("./app/middleware/common.middleware");
const configureRoutes = require("./app/routes/routes");
const configureMongodb = require("./app/database/mongodb");

const chalk = require("chalk");
require("dotenv").config();
const app = require("express")();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

configureMiddleware(app);
configureRoutes(app);
configureMongodb();

app.listen(PORT, () => {
  console.log(chalk.blue(`TIMEWATCH01 LISTENING ON PORT ${PORT}`));
});
