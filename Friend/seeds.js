const mongoose = require("mongoose");
const Viewall = require("./models/viewAll");

mongoose.connect("mongodb://localhost:27017/friend", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connd!");
});

const viewAllSeeds = [
    {
        title: "Hello",
        price: 1,
        description: "First One",
        author: "64839bce6fd85aa8d5335690",
    },
    {
        title: "Bye",
        price: 2,
        description: "Second One",
        author: "64839bce6fd85aa8d5335690",
    },
    {
        title: "Hola",
        price: 3,
        description: "Third One",
        author: "64839bce6fd85aa8d5335690",
    },
    {
        title: "Adios",
        price: 4,
        description: "Fourth One",
        author: "64839bce6fd85aa8d5335690",
    },
    {
        title: "Hi",
        price: 5,
        description: "Fifth One",
        author: "64839bce6fd85aa8d5335690",
    },
    {
        title: "Laters",
        price: 6,
        description: "Sixth One",
        author: "64839bce6fd85aa8d5335690",
    },
    {
        title: "Yo",
        price: 7,
        description: "Seventh One",
        author: "64839bce6fd85aa8d5335690",
    },
];

// Viewall.insertMany(viewAllSeeds)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((e) => {
//         console.log(e);
//     });
