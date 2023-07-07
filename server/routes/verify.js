const express = require("express");
const Router = express.Router();
const verify = require("../controllers/verify");

Router.use("/", verify);

module.exports = verify;