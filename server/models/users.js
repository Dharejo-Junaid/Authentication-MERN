const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isVerfied: Boolean
});

module.exports = mongoose.model("user", user);