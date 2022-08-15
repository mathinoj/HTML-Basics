const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
const Farm = require("./models/farm");
const { format } = require("path");

mongoose
    .connect("mongodb://localhost:27017/farmStandTake2")
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

//FARM ROUTES
app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", { farms });
});

app.get("/farms/new", (req, res) => {
    res.render("farms/new");
});

app.get("/farms/:id", async (req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render("farms/show", { farm });
});

app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms");
});

//PRODUCT ROUTES

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render("products/index", { products, category });
    } else {
        const products = await Product.find({});
        res.render("products/index", { products, category: "All" });
    }
    // const products = await Product.find({});
    //^^this finds everything, matches every product
    // This async route handler where we await some mongoose operation, we will do this all the time. So await Product.find({}) await Product.findByIdAndUpdate({}), await Product.remove({}).
    // res.render("products/index", { products });
});

// we need an HTML form this should serve the form
app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
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
    res.render("products/edit", { product, categories });
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

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

app.listen(3000, () => {
    console.log("App be listening");
});
