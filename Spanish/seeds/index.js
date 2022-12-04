const mongoose = require("mongoose");
const { english, spanish } = require("./seedHelperEngSpan");
// const hints = require("./hints");
const { hintOne, hintTwo } = require("./hints");
const cities = require("./cities");
const Viewall = require("../models/viewAll");
const Travelall = require("../models/viewAllTravel");

mongoose.connect("mongodb://localhost:27017/Spanish", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connexed");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDbSpan = async () => {
    await Viewall.deleteMany({});
    await Travelall.deleteMany({});
    for (let i = 0; i < 12; i++) {
        const randomOnes = Math.floor(Math.random() * 1000);
        const idioma = new Viewall({
            card: `${sample(english)} ${sample(spanish)}`,
            hint: `${sample(hintOne)} ${sample(hintTwo)}`,
            location: `${cities[randomOnes].city}, ${cities[randomOnes].state}`,
            // image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        });
        await idioma.save();

        const idiomaToo = new Travelall({
            //this is your userID, which should me mat
            author: "637e0b741b5422ffd7666135",
            location: `${cities[randomOnes].city}, ${cities[randomOnes].state}`,
            // image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            geometry: {
                type: "Point",
                // coordinates: [-113.1331, 47.0202],
                coordinates: [
                    cities[randomOnes].longitude,
                    cities[randomOnes].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dmjfoztry/image/upload/v1669392968/Spanish/tfuyjfkqcy5puln9zfsi.jpg",
                    filename: "Spanish/tfuyjfkqcy5puln9zfsi",
                },
                {
                    url: "https://res.cloudinary.com/dmjfoztry/image/upload/v1669463195/Spanish/efifkxzmtlmdgk8hdeka.jpg",
                    filename: "Spanish/ctq2utdiixiynhpedgjg",
                },
            ],
        });
        await idiomaToo.save();
    }
};

seedDbSpan().then(() => {
    mongoose.connection.close();
});
