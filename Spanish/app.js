const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Viewall = require("./models/viewAll");

mongoose.connect("mongodb://localhost:27017/Spanish", {});

const db = mongoose.connection;

//this logic checks to see if there is an error
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
    console.log("Database Connected Mayngz");
});
//this logic checks to see if there is an error^^^^^^^

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    // res.send("hello cards");

    res.render("home");
});

app.get("/cards", async (req, res) => {
    const viewAllCamp = await Viewall.find({});
    res.render("cards/index", { viewAllCamp });
});

app.get("/cards/new", async (req, res) => {
    // const card = new Viewall({ english: "What", spanish: "Que" });
    // await card.save();
    res.render("cards/new");
    //BEFORE, THIS WAS BELOW '/cards/:id/' but we moved it here because order matters
});

app.get("/cards/:id", async (req, res) => {
    const viewCampId = await Viewall.findById(req.params.id);
    res.render("cards/show", { viewCampId });
});

// app.get("/addSpanish", async (req, res) => {
//     // res.send("home landing");
//     const spanCard = new viewAll({
//         english: "How are you?",
//         spanish: "Como estas?",
//     });
//     await spanCard.save();
//     res.send(spanCard);
// });

app.listen(3000, () => {
    console.log("Connected port 3000");
});
