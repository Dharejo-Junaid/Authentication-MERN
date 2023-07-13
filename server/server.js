const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");

const login = require("./routes/login");
const signup = require("./routes/signup");
const verify = require("./routes/verify");

app.use("/login", login);
app.use("/signup", signup);
app.use("/verify/", verify);

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"]});
});

mongoose.connect(process.env.MONGODB_URI, {}).then(
  (err, res) => {
    if(res) {
      console.log("Database connection fail");
      return;
    }
  
    console.log("Database connected");
    app.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  }
);




