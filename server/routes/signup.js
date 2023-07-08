const express = require("express");
const Router = express.Router();
const bodyParser = require("body-parser");

const { createUser } = require("../controllers/singup");

// Router.use(bodyParser.urlencoded({extended: true}));
Router.use(bodyParser.json());

Router.post("/", createUser);

module.exports = Router;