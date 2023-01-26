const mongoose = require("mongoose");
const { hintOne, hintTwo } = require("./hints");
const Idioma = require("../models/idioma");
const Viewall = require("../models/viewAll");

mongoose.connect("mongodb://localhost:27017/idioma", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connexed");
});

const seedDbIdioma = async () => {
    await Idioma.deleteMany({});
    // const c = new Idioma({ spanish: "hola" });
    // await c.save(); THIS WAS A TEST DONE IN MOD 412

    const cardy = new Campground({
        //Your user ID
        author: "63c94a747495e6f4063670aa",
    });
    await cardy.save();
};
//set the loop to run 50 times to get a city

seedDbIdioma().then(() => {
    mongoose.connection.close();
});
//close our database connection. seedDB returns a promise cuz its an async function. Call mongoose.connection.close to close.
