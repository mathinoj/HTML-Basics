const mongoose = require("mongoose");
const { english, spanish } = require("./seedHelpersEngSpan");
// const spanishCard = require("../Models/viewAll");
const viewAll = require("../models/viewAll");

mongoose.connect("mongodb://localhost:27017/Spanish");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connexed");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDbSpan = async () => {
    await viewAll.deleteMany({});
    for (let i = 0; i < 12; i++) {
        // const randomOnes = Math.floor(Math.random() * 10)

        const idioma = new viewAll({
            card: `${sample(english)} ${sample(spanish)}`,
        });
        await idioma.save();
    }
};

seedDbSpan().then(() => {
    mongoose.connection.close();
});
