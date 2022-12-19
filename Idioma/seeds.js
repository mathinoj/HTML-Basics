const mongoose = require("mongoose");
const Language = require("./models/language");

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
    },
    {
        english: "Yes",
        spanish: "Si",
        hintOne: "Starts with S",
        hintTwo: "Ends with I",
    },
    {
        english: "Bye",
        spanish: "Adios",
        hintOne: "Starts with B",
        hintTwo: "Ends with S",
    },
    {
        english: "One",
        spanish: "Uno",
        hintOne: "Starts with U",
        hintTwo: "Ends with O",
    },
    {
        english: "Monday",
        spanish: "Lunes",
        hintOne: "Starts with L",
        hintTwo: "Ends with S",
    },
    {
        english: "Where",
        spanish: "Donde",
        hintOne: "Starts with D",
        hintTwo: "Ends with E",
    },
    {
        english: "Head",
        spanish: "Cabeza",
        hintOne: "Starts with C",
        hintTwo: "Ends with A",
    },
];

Language.insertMany(seedLanguages)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
//One thing to know about insertManyy in Mongoose is that if anything does not pass validation, then nothing will be inserted at least by default. So Mongoose validates all of this before it inserts anything, and then it inserts it in one go. So just know that if you do have validations and we're failing, everything will fail to insert.
