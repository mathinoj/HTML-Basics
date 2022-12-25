const mongoose = require("mongoose");
const Idioma = require("./models/idioma");

mongoose.connect("mongodb://localhost:27017/idioma", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected!");
});

//this file you run on its own anytime you want to get some new data in DB, which is pretty common - to seed your DB sepertately from a web app for development purposes. We want some data in there and we want to isolate it from the actual index.js/app.js of the application youre building

const seedLanguages = [
    {
        english: "Hello",
        spanish: "Hola",
        hintOne: "Starts with H",
        hintTwo: "Ends with A",
        number: 8,
    },
    {
        english: "Yes",
        spanish: "Si",
        hintOne: "Starts with S",
        hintTwo: "Ends with I",
        number: 7,
    },
    {
        english: "Bye",
        spanish: "Adios",
        hintOne: "Starts with B",
        hintTwo: "Ends with S",
        number: 6,
    },
    {
        english: "One",
        spanish: "Uno",
        hintOne: "Starts with U",
        hintTwo: "Ends with O",
        number: 5,
    },
    {
        english: "Monday",
        spanish: "Lunes",
        hintOne: "Starts with L",
        hintTwo: "Ends with S",
        number: 4,
    },
    {
        english: "Where",
        spanish: "Donde",
        hintOne: "Starts with D",
        hintTwo: "Ends with E",
        number: 3,
    },
    {
        english: "Head",
        spanish: "Cabeza",
        hintOne: "Starts with C",
        hintTwo: "Ends with A",
        number: 2,
    },
    {
        english: "Five",
        spanish: "Cinco",
        hintOne: "Starts with C",
        hintTwo: "Ends with O",
        number: 1,
    },
];

Idioma.insertMany(seedLanguages)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
//One thing to know about insertManyy in Mongoose is that if anything does not pass validation, then nothing will be inserted at least by default. So Mongoose validates all of this before it inserts anything, and then it inserts it in one go. So just know that if you do have validations and we're failing, everything will fail to insert.
