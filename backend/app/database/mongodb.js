const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log(chalk.blue("*** CONNECTED TO MONGO ***"));
  } catch (error) {
    // console.log(chalk.red("*** CONNECT TO MONGO FAILED ***"));
    throw error;
  }
};
