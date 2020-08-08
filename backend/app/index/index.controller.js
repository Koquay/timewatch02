const chalk = require("chalk");

exports.getHome = (req, res) => {
  console.log(chalk.blue("INDEX CONTROLLER GET HOME"));
  try {
    res.sendFile(process.env.INDEX);
  } catch (error) {
    throw error;
  }
};
