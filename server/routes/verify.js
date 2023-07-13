const express = require("express");
const Router = express.Router();
const verify = require("../controllers/verify");

Router.get("/", verify);

module.exports = verify;