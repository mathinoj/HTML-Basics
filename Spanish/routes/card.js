const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
    spanishSchema,
    spanishSchemaAlso,
    reviewSchema,
} = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Viewall = require("../models/viewAll");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

app.get(
    "/cards",
    catchAsync(async (req, res) => {
        const viewAllCamp = await Viewall.find({});
        res.render("cards/index", { viewAllCamp });
    })
);

app.get("/cards/new", (req, res) => {
    // const card = new Viewall({ english: "What", spanish: "Que" });
    // await card.save();
    res.render("cards/new");
    //BEFORE, THIS ROUTE WAS BELOW '/cards/:id/' but we moved it here because order matters
});

app.post(
    "/cards",
    validateCard,
    catchAsync(async (req, res, next) => {
        // const SpanishSchema = Joi.object({
        //     card: Joi.object({
        //         card: Joi.string().required,
        //         hint: Joi.string().required,
        //         english: Joi.string().required,
        //         spanish: Joi.string().required,
        //         hintOne: Joi.string().required,
        //         hintTwo: Joi.string().required,
        //     }).required(),
        // });
        // const { error } = SpanishSchema.validate(req.body);
        // if (error) {
        //     const msg = error.details.map((el) => el.message).join(",");
        //     throw new ExpressError(msg, 400);
        // }
        // if (!req.body.card) throw new ExpressError("Invalid card data!", 400);
        const newCard = new Viewall(req.body.card);
        // const newCardHint = new Viewall(req.body.hint);
        await newCard.save();
        // await newCardHint.save();
        res.redirect(`/cards/${newCard._id}`);
        // res.send(req.body);
    })
);

app.get(
    "/cards/:id",
    catchAsync(async (req, res) => {
        const viewCampId = await Viewall.findById(req.params.id);
        res.render("cards/show", { viewCampId });
    })
);

app.get(
    "/cards/:id/edit",
    catchAsync(async (req, res) => {
        const editCard = await Viewall.findById(req.params.id);
        res.render("cards/edit", { editCard });
    })
);

app.put(
    "/cards/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const editedCard = await Viewall.findByIdAndUpdate(id, {
            ...req.body.card,
        });
        res.redirect(`/cards/${editedCard._id}`);
        // res.send("it TWERKED");
    })
);

app.delete(
    "/cards/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Viewall.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);
