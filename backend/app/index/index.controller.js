const chalk = require("chalk");

exports.getHome = (req, res) => {
  try {
    res.sendFile(process.env.INDEX);
  } catch (error) {
    throw error;
  }
};
