const express = require("express");
const Router = express.Router();

const bodyParser = require("body-parser");

Router.use(bodyParser.urlencoded({extended: true}));

Router.post("/", async (req, res) => {
    res.json({
        success: true,
        message: "Login sucessful",
        token: "Token"
    });
});

module.exports = Router;