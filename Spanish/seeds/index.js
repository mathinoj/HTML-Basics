const mongoose = require("mongoose");
const { english, spanish } = require("./seedHelperEngSpan");
// const hints = require("./hints");
const { hintOne, hintTwo } = require("./hints");
const Viewall = require("../models/viewAll");

mongoose.connect("mongodb://localhost:27017/Spanish", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connexed");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDbSpan = async () => {
    await Viewall.deleteMany({});
    for (let i = 0; i < 12; i++) {
        const randomOnes = Math.floor(Math.random() * 20);
        const idioma = new Viewall({
            card: `${sample(english)} ${sample(spanish)}`,
            hint: `${sample(hintOne)} ${sample(hintTwo)}`,
            // hint: `${[randomOnes].hintOne}, ${[randomOnes].hintTwo}`,
        });
        await idioma.save();
    }
};

seedDbSpan().then(() => {
    mongoose.connection.close();
});
