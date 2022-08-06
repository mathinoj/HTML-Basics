const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
const { format } = require("path");

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
    const products = await Product.find({});
    //^^this finds everything, matches every product
    // This async route handler where we await some mongoose operation, we will do this all the time. So await Product.find({}) await Product.findByIdAndUpdate({}), await Product.remove({}).
    res.render("products/index", { products });
});

// we need an HTML form this should serve the form
app.get("/products/new", (req, res) => {
    res.render("products/new");
});

// app.post to /products should be where we submit the form and create a new product
//when we have a post request and we want info from the post request body. we dont have access to request.body immediately. Instead we need to tell express to use app.use(express.urlencoded({extended: true})) (this is on line 21)
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(newProduct);
    // res.send("makin product");
    res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    });
    res.redirect(`/products/${product._id}`);
    // console.log(req.body)
    // res.send("PUTT")
});

app.listen(3000, () => {
    console.log("App be listening");
});
