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

app.get("/products", async (req, res) => {
    const products = await Product.find({});
    //^^this finds everything, matches every product
    // This async route handler where we await some mongoose operation, we will do this all the time. So await Product.find({}) await Product.findByIdAndUpdate({}), await Product.remove({}).
    res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render("products/show", { product });
});

app.listen(3000, () => {
    console.log("App be listening");
});
