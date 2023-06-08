const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { cardSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Viewall = require("../models/viewAll");

const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

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
        const newCard = new Viewall(req.body.newCard);
        await newCard.save();
        res.redirect(`cards/${newCard._id}`);
    })
);

app.get(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        const cardz = await Viewall.findById(req.params.id);
        res.render("cards/show", { cardz });
    })
);

app.get(
    "/cards/:id/edit",
    catchAsync(async (req, res, next) => {
        const newCard = await Viewall.findById(req.params.id);
        res.render("cards/edit", { newCard });
    })
);

app.put(
    "/cards/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const card = await Viewall.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        res.redirect(`/cards/${card._id}`);
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
