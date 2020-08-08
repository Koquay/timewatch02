const router = require("express").Router();
const authenticationController = require("./authentication.controller");

router.post("/", authenticationController.login);

module.exports = router;
