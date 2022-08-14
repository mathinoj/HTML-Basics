const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const Product = require("./models/product");
const { format } = require("path");

mongoose
    .connect("mongodb://localhost:27017/farmStand2")
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

const categories = ["fruit", "vegetable", "dairy"];

app.get(
    "/products",
    wrapAsync(async (req, res, next) => {
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
    })
);

// we need an HTML form this should serve the form
app.get("/products/new", (req, res) => {
    // throw new AppError("UNallowed", 401); THIS IS USED AS A TEST
    res.render("products/new", { categories });
});

// app.post to /products should be where we submit the form and create a new product
//when we have a post request and we want info from the post request body. we dont have access to request.body immediately. Instead we need to tell express to use app.use(express.urlencoded({extended: true})) (this is on line 21)
app.post(
    "/products",
    wrapAsync(async (req, res, next) => {
        const newProduct = new Product(req.body);
        await newProduct.save();
        // console.log(newProduct);
        // res.send("makin product");
        res.redirect(`/products/${newProduct._id}`);
    })
);

// app.get("/products/:id", async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         if (!product) {
//             throw new AppError("Product UNFound Brah", 404);
//         }
//         // console.log(product);
//         res.render("products/show", { product });
//     } catch (e) {
//         next(e);
//     }
// });

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((e) => next(e));
    };
}

app.get(
    "/products/:id",
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new AppError("Product UNFound Brah", 404);
        }
        // console.log(product);
        res.render("products/show", { product });
    })
);

app.get(
    "/products/:id/edit",
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(new AppError("Product UNFound Broseph", 404));
        }
        res.render("products/edit", { product, categories });
    })
);

app.put(
    "/products/:id",
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true,
        });
        res.redirect(`/products/${product._id}`);
        // console.log(req.body)
        // res.send("PUTT")
    })
);

app.delete(
    "/products/:id",
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.redirect("/products");
    })
);

const handleValidationErr = (err) => {
    // console.log(err);
    console.dir(err);

    return new AppError(`Validation Failed...${err.message}`, 400);
};

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidationErr(err);
    next(err);
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something wrong" } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log("App be listening");
});
