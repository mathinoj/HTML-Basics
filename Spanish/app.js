const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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

app.use(express.urlencoded({ extended: true }));
//for the new card submission we wont see any of our text submissions because the request body hasn't been parced so we tell express to parse the body by doing the app.use...
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    // res.send("hello cards");

    res.render("home");
});

app.get("/cards", async (req, res) => {
    const viewAllCamp = await Viewall.find({});
    res.render("cards/index", { viewAllCamp });
});

app.get("/cards/new", (req, res) => {
    // const card = new Viewall({ english: "What", spanish: "Que" });
    // await card.save();
    res.render("cards/new");
    //BEFORE, THIS ROUTE WAS BELOW '/cards/:id/' but we moved it here because order matters
});

app.post("/cards", async (req, res) => {
    const newCard = new Viewall(req.body.card);
    // const newCardHint = new Viewall(req.body.hint);
    await newCard.save();
    // await newCardHint.save();
    res.redirect(`/cards/${newCard._id}`);
    // res.send(req.body);
});

app.get("/cards/:id", async (req, res) => {
    const viewCampId = await Viewall.findById(req.params.id);
    res.render("cards/show", { viewCampId });
});

app.get("/cards/:id/edit", async (req, res) => {
    const editCard = await Viewall.findById(req.params.id);
    res.render("cards/edit", { editCard });
});

app.put("/cards/:id", async (req, res) => {
    const { id } = req.params;
    const editedCard = await Viewall.findByIdAndUpdate(id, {
        ...req.body.card,
    });
    res.redirect(`/cards/${editedCard._id}`);
    // res.send("it TWERKED");
});

app.listen(3000, () => {
    console.log("Connected port 3000");
});
