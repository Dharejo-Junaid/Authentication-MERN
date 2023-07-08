const express = require("express");
const Router = express.Router();
const { userLogin } = require("../controllers/login");
const auth = require("../middlewares/auth");

const bodyParser = require("body-parser");

// Router.use(bodyParser.urlencoded({extended: true}));
Router.use(bodyParser.json());
Router.post("/", auth, userLogin);

module.exports = Router;