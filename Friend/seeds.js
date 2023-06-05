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
        // price: 1,
        description: "First One",
    },
    {
        title: "Bye",
        // price: 2,
        description: "Second One",
    },
    {
        title: "Hola",
        // price: 3,
        description: "Third One",
    },
    {
        title: "Adios",
        // price: 4,
        description: "Fourth One",
    },
    {
        title: "Hi",
        // price: 5,
        description: "Fifth One",
    },
    {
        title: "Laters",
        // price: 6,
        description: "Sixth One",
    },
    {
        title: "Yo",
        // price: 7,
        description: "Seventh One",
    },
];

// Viewall.insertMany(viewAllSeeds)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((e) => {
//         console.log(e);
//     });
