const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema, reviewSchema } = require("../schemas.js");

const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
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
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", { campgrounds }); //added {campgrounds} 413
    })
);

router.get("/new", (req, res) => {
    // if (!req.isAuthenticated()) {
    //     req.flash("error", "must be signed in");
    //     return res.redirect("/login");
    // }
    res.render("campgrounds/new");
});

router.post(
    "/",
    validateCampground,
    catchAsync(async (req, res, next) => {
        // if (!req.body.campground)
        //     throw new ExpressError("Invalid camp data", 400);

        const campground = new Campground(req.body.campground);
        await campground.save();
        req.flash("success", "Successfully made a new camp!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id).populate(
            "reviews"
        );
        if (!campground) {
            req.flash("error", "Can't find that camp!");
            return res.redirect("/campgrounds");
        }
        // console.log(campground); test to see reviews in terminal
        res.render("campgrounds/show", { campground });
    })
);

router.get(
    "/:id/edit",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id);
        if (!campground) {
            req.flash("error", "Can't find that camp!");
            return res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit", { campground });
    })
);

router.put(
    "/:id",
    validateCampground,
    catchAsync(async (req, res) => {
        // res.send("it worked"); // this is a test!!
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {
            ...req.body.campground,
        });
        //... is the spread operator. Spreads into the object {...req.body.campground}
        req.flash("success", "Successfully updated camp!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.delete(
    "/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted camp!");
        res.redirect("/campgrounds");
    })
);

module.exports = router;
