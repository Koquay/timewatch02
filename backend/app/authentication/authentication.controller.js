const authenticationService = require("./authentication.service");

exports.login = async (req, res) => {
  try {
    await authenticationService.login(req, res);
  } catch (error) {
    throw error;
  }
};
