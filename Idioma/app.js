const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Idioma = require("./models/idioma");

mongoose.connect("mongodb://localhost:27017/idioma", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected!");
});
//This is the logic to check if there is an error or if there is successful connection

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.send("hello idiotma"); THIS WAS DONE AS A TEST TO SEE CONNECTION
    res.render("home");
});

app.get("/cards", async (req, res) => {
    const allCards = await Idioma.find({});
    // console.log(allCards);
    // res.send("Everything her!");
    res.render("cards/index", { allCards });
});

app.get("/cards/new", (req, res) => {
    res.render("cards/new");
});

app.post("/cards", async (req, res) => {
    const newCard = new Idioma(req.body);
    await newCard.save();

    // console.log(newCard);
    // res.send("makin card TEST 2");
    // console.log(req.body);
    // res.send("makin card TEST 1");
    res.redirect(`/cards/${newCard._id}`);
});
//When we have a post request and we want information from the post request body. We don't have access to request body immediately. It's just undefined, nothing is there. It's not going to be parsed. We need to tell express to use that middleware.

app.get("/cards/:id", async (req, res) => {
    const { id } = req.params;
    const card = await Idioma.findById(id);
    // console.log(card);
    // res.send("Specifc card page. More detailed.");
    res.render("cards/show", { card });
});

// app.get("/makeLanguage", async (req, res) => {
//     const langCard = new Language({
//         english: "hello",
//         spanish: "hola",
//     });
//     await langCard.save();
//     res.send(langCard);
// });

app.listen(3000, () => {
    console.log("Connected to pizort 3000!");
});
