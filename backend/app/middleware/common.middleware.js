const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const express = require("express");
const chalk = require("chalk");

process.env.DIST = path.join(__dirname, "../../../dist/timewatch02");
process.env.INDEX = path.join(process.env.DIST, "/index.html");

module.exports = (app) => {
  console.log(chalk.blue("COMMON.MIDDLEWARE"));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(morgan("common"));
  app.use(cors());
  app.use(helmet());
  app.use(express.static(process.env.DIST));
};
