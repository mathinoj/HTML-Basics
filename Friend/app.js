const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { cardSchema } = require("./schema.js");
const Viewall = require("./models/viewAll");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { cardSchema } = require("../Idioma/schemas");

mongoose.connect("mongodb://localhost:27017/friend", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB Connd");
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

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

app.get(
    "/cards",
    catchAsync(async (req, res, next) => {
        const allCards = await Viewall.find({});
        // console.log("allCards: " + allCards);
        res.render("cards/index", { allCards });
    })
);

app.get("/cards/new", (req, res) => {
    res.render("cards/new");
});

app.post(
    "/cards",
    validateCard,
    catchAsync(async (req, res, next) => {
        // if (!req.body.newCard) throw new ExpressError("Invalid Card Data", 400);
        // const cardSchema = Joi.object({
        //     newCard: Joi.object({
        //         title: Joi.string().required(),
        //         price: Joi.number().required().min(0),
        //         description: Joi.string().required(),
        //     }).required(),
        // });
        // const { error } = cardSchema.validate(req.body);
        // if (error) {
        //     const msg = error.details.map((el) => el.message).join(",");
        //     throw new ExpressError(msg, 400);
        // }
        // console.log(msg);

        const newCard = new Viewall(req.body.newCard);
        await newCard.save();
        res.redirect(`cards/${newCard._id}`);
    })
);

app.get(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        // const { id } = req.params;
        const cardz = await Viewall.findById(req.params.id);
        res.render("cards/show", { cardz });
    })
);

app.get(
    "/cards/:id/edit",
    catchAsync(async (req, res, next) => {
        // const { id } = req.params;
        const editCard = await Viewall.findById(req.params.id);
        res.render("cards/edit", { editCard });
    })
);

app.put(
    "/cards/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const newCard = await Viewall.findByIdAndUpdate(id, {
            ...req.body.editCard,
        });
        res.redirect(`/cards/${newCard._id}`);
    })
);

app.delete(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const deletedCard = await Viewall.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);

app.all("*", (req, res, next) => {
    // res.send("yor get 404 TEST TEST TEST");
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    // const { statusCode = 500, message = "Somethin wrong" } = err;
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Someting wrong!";
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error", { err });
});

app.use((err, req, res, next) => {
    res.send("Sutin went wrong!");
});

app.listen(3000, () => {
    console.log("Connd to Port 3000");
});
