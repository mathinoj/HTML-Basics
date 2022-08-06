const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
    .connect("mongodb://localhost:27017/farmStand")
    .then(() => {
        console.log("MONGO connex open");
    })
    .catch((err) => {
        console.log("ERROR with MONGO");
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/dog", (req, res) => {
    res.send("Bark");
});

app.listen(3000, () => {
    console.log("App be listening");
});
