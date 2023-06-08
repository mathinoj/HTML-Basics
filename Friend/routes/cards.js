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

router.get(
    "/",
    catchAsync(async (req, res, next) => {
        const allCards = await Viewall.find({});
        // console.log("allCards: " + allCards);
        res.render("cards/index", { allCards });
    })
);

router.get("/cards/new", (req, res) => {
    res.render("cards/new");
});

router.post(
    "/",
    validateCard,
    catchAsync(async (req, res, next) => {
        const newCard = new Viewall(req.body.newCard);
        await newCard.save();
        res.redirect(`cards/${newCard._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res, next) => {
        const cardz = await Viewall.findById(req.params.id);
        res.render("cards/show", { cardz });
    })
);

router.get(
    "/:id/edit",
    catchAsync(async (req, res, next) => {
        const newCard = await Viewall.findById(req.params.id);
        res.render("cards/edit", { newCard });
    })
);

router.put(
    "/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const card = await Viewall.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        res.redirect(`/cards/${card._id}`);
    })
);

router.delete(
    "/:id",
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const deletedCard = await Viewall.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);
