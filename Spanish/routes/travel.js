const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
    spanishSchema,
    spanishSchemaAlso,
    reviewSchema,
} = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Travelall = require("../models/viewAllTravel");

///TRAVEL
const validateTravel = (req, res, next) => {
    const { error } = spanishSchemaAlso.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

///TRAVEL
router.get(
    "/",
    catchAsync(async (req, res) => {
        const viewAllTravel = await Travelall.find({});
        res.render("travel/index", { viewAllTravel });
    })
);

///TRAVEL
router.get("/new", (req, res) => {
    res.render("travel/new");
});

///TRAVEL
router.post(
    "/",
    validateTravel,
    catchAsync(async (req, res, next) => {
        const newTravel = new Travelall(req.body.travel);
        await newTravel.save();
        res.redirect(`/travel/${newTravel._id}`);
    })
);

///TRAVEL
router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const viewTravelId = await Travelall.findById(req.params.id).populate(
            "reviews"
        );
        res.render("travel/show", { viewTravelId });
    })
);

///TRAVEL
router.get(
    "/:id/edit",
    catchAsync(async (req, res) => {
        const editTravel = await Travelall.findById(req.params.id);
        res.render("travel/edit", { editTravel });
    })
);

///TRAVEL
router.put(
    "/:id",
    validateTravel,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const editedTravel = await Travelall.findByIdAndUpdate(id, {
            ...req.body.travel,
        });
        res.redirect(`/travel/${editedTravel._id}`);
    })
);

//TRAVEL
router.delete(
    "/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Travelall.findByIdAndDelete(id);
        res.redirect("/travel");
    })
);

module.exports = router;
