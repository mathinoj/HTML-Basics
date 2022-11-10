const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ViewAll = require("./models/viewAll");

mongoose.connect("mongodb://localhost:27017/Spanish", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
    console.log("Database Connected Mayngz");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    // res.send("hello cards");

    res.render("home");
});

// app.get("/viewAll", async (req, res) => {
//     const viewAll = await ViewAll.find({});
//     res.render("cards/index");
// });

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
