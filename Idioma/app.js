const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
//^^One of many engines used to run or PARSE and basically make sense of EJS
const Idioma = require("./models/idioma");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/idioma", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected!");
});
//This is the logic to check if there is an error or if there is successful connection

const app = express();

app.engine("ejs", ejsMate);
//^^Here we tell EXPRESS which one we want to use instead of the default one its relying on
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// When we have a post request and we want information from the post request body. We don't have access to request body immediately. It's just undefined, nothing is there. It's not going to be parsed. We need to tell express to use that middleware (parsing middleware).
app.use(methodOverride("_method"));

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
    // const newCard = new Idioma(req.body);
    // await newCard.save();
    const newCard = new Idioma(req.body.newCard);
    await newCard.save();

    // console.log(newCard);
    // res.send("makin card TEST 2");
    // console.log(req.body);
    // res.send("makin card TEST 1");
    res.redirect(`/cards/${newCard._id}`);
});
// SEE UNDER: app.use(express.urlencoded({ extended: true }));

app.get("/cards/:id", async (req, res) => {
    // const { id } = req.params;
    // const card = await Idioma.findById(id);
    const card = await Idioma.findById(req.params.id);
    // console.log(card);
    // res.send("Specifc card page. More detailed.");
    res.render("cards/show", { card });
});

app.get("/cards/:id/edit", async (req, res) => {
    // const { id } = req.params;
    // const editCard = await Idioma.findById(id);
    const editCard = await Idioma.findById(req.params.id);
    res.render("cards/edit", { editCard });
});

app.put("/cards/:id", async (req, res) => {
    //from a FORM we cant make a put request, which is why we'll need to do a METHOD OVERRIDE. npm i method-override --> will go in terminal. THEN we have to require it (see TOP)
    const { id } = req.params;
    console.log("this is id: " + { id });
    // const card = await Idioma.findByIdAndUpdate(id, req.body, {
    //passes is in ID and then pass in our DATA(req.body). So were taking the entire body of the EJS file
    //     runValidators: true,
    //     new: true,
    // });
    //first argument is ID, second arg is how we want to update, third is options
    const card = await Idioma.findByIdAndUpdate(id, { ...req.body.editCard });
    console.log("this is card: " + card);
    //we take in what is request.body.editCard
    //we use the ...(spread operator) because it takes in the properties, the key-value pairs from one area and copies/adds/combines them to the new object. So here it takes the the edit.ejs file and grabs the keys (textarea & input) and their values (whatever edits are made by user) and adds them to the new object (const card), which we

    //we copy everything over from req.body.editCard of the specific card which was gotten by the id paramater before it.
    res.redirect(`/cards/${card._id}`);
    console.log("here: " + card._id);
    //Do redirect cuz we don't want to send a POST request again (if we hit refresh it would make the same product again). Also we never send back an HTML response from a POST route (POST route is in edit.ejs). Therefore we redirect.
    // console.log(req.body); BEFORE ALL ABOVE, did these two as TEST!!
    // res.send("pUt!!");
});

// You redirect just like when you create a new product because you don't want to be able to send that post request again to make a product. Just like we don't want to continuously update that product, although it's not an issue because you're just updating the same product.

//We have to decide whether we want to do a put or patch request for the EDIT!
//put request is replacing/overriding an object
//patch request is changing a portion of an object or document

// We could honestly get away with either one here. We do a put request because we are taking everything from this form, whatever the values are, and we're going to update the given product. Maybe we could have a route called Change Quantity, and we don't have quantity, but we could have a single route dedicated to changing category or quantity, in which case that would be a patch request most likely.

app.delete("/cards/:id", async (req, res) => {
    // res.send("delete wrukin"); TEST 1
    const { id } = req.params;
    const deletedCard = await Idioma.findByIdAndDelete(id);
    res.redirect("/cards");
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
