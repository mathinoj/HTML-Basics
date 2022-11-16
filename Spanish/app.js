const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Viewall = require("./models/viewAll");
const Travelall = require("./models/viewAllTravel");

mongoose.connect("mongodb://localhost:27017/Spanish", {});

const db = mongoose.connection;

//this logic checks to see if there is an error
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
    console.log("Database Connected Mayngz");
});
//this logic checks to see if there is an error^^^^^^^

const app = express();

app.engine("ejs", ejsMate);
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

///TRAVEL
app.get("/travel", async (req, res) => {
    const viewAllTravel = await Travelall.find({});
    res.render("travel/index", { viewAllTravel });
});

app.get("/cards/new", (req, res) => {
    // const card = new Viewall({ english: "What", spanish: "Que" });
    // await card.save();
    res.render("cards/new");
    //BEFORE, THIS ROUTE WAS BELOW '/cards/:id/' but we moved it here because order matters
});

///TRAVEL
app.get("/travel/new", (req, res) => {
    res.render("travel/new");
});

app.post("/cards", async (req, res, next) => {
    try {
        const newCard = new Viewall(req.body.card);
        // const newCardHint = new Viewall(req.body.hint);
        await newCard.save();
        // await newCardHint.save();
        res.redirect(`/cards/${newCard._id}`);
        // res.send(req.body);
    } catch (error) {
        next(error);
    }
});

///TRAVEL
app.post("/travel", async (req, res, next) => {
    try {
        const newTravel = new Travelall(req.body.travel);
        await newTravel.save();
        res.redirect(`/travel/${newTravel._id}`);
    } catch (error) {
        next(error);
    }
});

app.get("/cards/:id", async (req, res) => {
    const viewCampId = await Viewall.findById(req.params.id);
    res.render("cards/show", { viewCampId });
});

///TRAVEL
app.get("/travel/:id", async (req, res) => {
    const viewTravelId = await Travelall.findById(req.params.id);
    res.render("travel/show", { viewTravelId });
});

app.get("/cards/:id/edit", async (req, res) => {
    const editCard = await Viewall.findById(req.params.id);
    res.render("cards/edit", { editCard });
});

///TRAVEL
app.get("/travel/:id/edit", async (req, res) => {
    const editTravel = await Travelall.findById(req.params.id);
    res.render("travel/edit", { editTravel });
});

app.put("/cards/:id", async (req, res) => {
    const { id } = req.params;
    const editedCard = await Viewall.findByIdAndUpdate(id, {
        ...req.body.card,
    });
    res.redirect(`/cards/${editedCard._id}`);
    // res.send("it TWERKED");
});

///TRAVEL
app.put("/travel/:id", async (req, res) => {
    const { id } = req.params;
    const editedTravel = await Travelall.findByIdAndUpdate(id, {
        ...req.body.travel,
    });
    res.redirect(`/travel/${editedTravel._id}`);
});

app.delete("/cards/:id", async (req, res) => {
    const { id } = req.params;
    await Viewall.findByIdAndDelete(id);
    res.redirect("/cards");
});

//TRAVEL
app.delete("/travel/:id", async (req, res) => {
    const { id } = req.params;
    await Travelall.findByIdAndDelete(id);
    res.redirect("/travel");
});

app.use((err, req, res, next) => {
    res.send("Suntin went wrong!");
});

app.listen(3000, () => {
    console.log("Connected port 3000");
});
