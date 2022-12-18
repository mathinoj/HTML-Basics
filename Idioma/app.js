const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Idioma", {});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    // res.send("hello idiotma");
    res.render("home");
});

app.listen(3000, () => {
    console.log("Connected to pizort 3000!");
});
