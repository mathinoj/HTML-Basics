const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Viewall = require("./models/viewAll");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/friend", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connd");
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    // res.send("test if it wrx");
    res.render("home");
});

// app.get("/make", async (req, res) => {
//     const card = new Viewall({
//         title: "hello",
//         price: 5,
//         description: "hello test",
//     });
//     await card.save();
//     res.send(card);
// });

app.get("/cards", async (req, res) => {
    const allCards = await Viewall.find({});
    // console.log("allCards: " + allCards);
    res.render("cards/index", { allCards });
});

app.get("/cards/new", (req, res) => {
    res.render("cards/new");
});

app.post("/cards", async (req, res) => {
    const newCard = new Viewall(req.body.newCard);
    await newCard.save();
    res.redirect(`cards/${newCard._id}`);
});

app.get("/cards/:id", async (req, res) => {
    // const { id } = req.params;
    const cardz = await Viewall.findById(req.params.id);
    res.render("cards/show", { cardz });
});

app.get("/cards/:id/edit", async (req, res) => {
    // const { id } = req.params;
    const editCard = await Viewall.findById(req.params.id);
    res.render("cards/edit", { editCard });
});

app.put("/cards/:id", async (req, res) => {
    const { id } = req.params;
    const card = await Viewall.findByIdAndUpdate(id, { ...req.body.editCard });
    res.redirect(`/cards/${card._id}`);
});

app.delete("/cards/:id", async (req, res) => {
    const { id } = req.params;
    const deletedCard = await Viewall.findByIdAndDelete(id);
    res.redirect("/cards");
});

app.listen(3000, () => {
    console.log("Connd to Port 3000");
});
