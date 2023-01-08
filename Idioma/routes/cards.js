const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { cardSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Idioma = require("../models/idioma");

const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(msg, 400);
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    } else {
        next();
    }
};

router.get(
    "/",
    catchAsync(async (req, res, next) => {
        const allCards = await Idioma.find({});

        res.render("cards/index", { allCards });
    })
);

router.get(
    "/test",
    catchAsync(async (req, res, next) => {
        const randomDocs = await db
            .collection("idiomas")
            .aggregate([{ $sample: { size: 1 } }])
            .toArray();
        // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-sample
        // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/#pipe._S_sample
        // https://stackoverflow.com/questions/54585939/mongodb-and-node-js-aggregate-using-sample-isnt-returning-a-document

        res.render(`cards/test`, { randomDocs });
    })
);

router.get("/new", (req, res) => {
    res.render("cards/new");
});

router.post(
    "/",
    validateCard,
    catchAsync(async (req, res, next) => {
        const newCard = new Idioma(req.body.newCard);
        await newCard.save();

        res.redirect(`/cards/${newCard._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res, next) => {
        const card = await Idioma.findById(req.params.id);
        res.render("cards/show", { card });
    })
);

router.get(
    "/:id/edit",
    catchAsync(async (req, res, next) => {
        const newCard = await Idioma.findById(req.params.id);
        res.render("cards/edit", { newCard });
    })
);

router.put(
    "/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        console.log("this is id: " + { id });

        const card = await Idioma.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        console.log("this is card: " + card);

        res.redirect(`/cards/${card._id}`);
        console.log("here: " + card._id);
    })
);

router.delete(
    "/:id",
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const deletedCard = await Idioma.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);

module.exports = router;

//EXPRESS comes with EXPRESS ROUTER.
//routes help us clean up the app. it also makes things simpler
