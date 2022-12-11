const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { spanishSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Viewall = require("../models/viewAll");

const validateCard = (req, res, next) => {
    const { error } = spanishSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.get(
    "/",
    catchAsync(async (req, res) => {
        const viewAllCamp = await Viewall.find({});
        res.render("cards/index", { viewAllCamp });
    })
);

router.get("/new", (req, res) => {
    res.render("cards/new");
});

router.post(
    "/",
    validateCard,
    catchAsync(async (req, res, next) => {
        const newCard = new Viewall(req.body.card);
        await newCard.save();
        res.redirect(`/cards/${newCard._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const viewCampId = await Viewall.findById(req.params.id);
        res.render("cards/show", { viewCampId });
    })
);

router.get(
    "/:id/edit",
    catchAsync(async (req, res) => {
        const editCard = await Viewall.findById(req.params.id);
        res.render("cards/edit", { editCard });
    })
);

router.put(
    "/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const editedCard = await Viewall.findByIdAndUpdate(id, {
            ...req.body.card,
        });
        res.redirect(`/cards/${editedCard._id}`);
    })
);

router.delete(
    "/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Viewall.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);

module.exports = router;
