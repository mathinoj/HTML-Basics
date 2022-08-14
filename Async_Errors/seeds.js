const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
    .connect("mongodb://localhost:27017/farmStand2")
    .then(() => {
        console.log("MONGO connex open");
    })
    .catch((err) => {
        console.log("ERROR with MONGO");
        console.log(err);
    });

// const p = new Product({
//     name: "Ruby Grapefruit",
//     price: 1.5,
//     category: "fruit",
// });
// p.save()
//     .then((p) => {
//         console.log(p);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

const seedProducts = [
    {
        name: "Eggplant",
        price: 1.5,
        category: "vegetable",
    },
    {
        name: "Tomato",
        price: 1.25,
        category: "vegetable",
    },
    {
        name: "Soy Milk",
        price: 2.75,
        category: "dairy",
    },
    {
        name: "Watermelon",
        price: 5.0,
        category: "fruit",
    },
    {
        name: "Mango",
        price: 1.0,
        category: "fruit",
    },
    {
        name: "Rasberrys",
        price: 2.0,
        category: "fruit",
    },
    {
        name: "Queso Oaxaca",
        price: 3.5,
        category: "dairy",
    },
];
//with insertMany, if anything does not pass validation then by default nothing will be inserted
Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
