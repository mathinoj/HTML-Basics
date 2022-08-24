const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema, reviewSchema } = require("../schemas.js");
const { isLoggedIn } = require("../middleware");

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

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    //^^ takes id from the url, and looks up the campground withat that ID
    const campground = await Campground.findById(id);
    //^^looks to see if the users ID, the user that is logged in at that time, equals the campgrounds authorID, if not we'll flash the error
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "you aint allowed to does that!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
};

router.get(
    "/",
    catchAsync(async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", { campgrounds }); //added {campgrounds} 413
    })
);

router.get("/new", isLoggedIn, (req, res) => {
    // if (!req.isAuthenticated()) {
    //     req.flash("error", "must be signed in");
    //     return res.redirect("/login");
    // }
    res.render("campgrounds/new");
});

router.post(
    "/",
    isLoggedIn,
    validateCampground,
    catchAsync(async (req, res, next) => {
        // if (!req.body.campground)
        //     throw new ExpressError("Invalid camp data", 400);

        const campground = new Campground(req.body.campground);
        campground.author = req.user._id;
        await campground.save();
        req.flash("success", "Successfully made a new camp!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id)
            .populate("reviews")
            .populate("author");
        console.log(campground);
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
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        if (!campground) {
            req.flash("error", "Can't find that camp!");
            return res.redirect("/campgrounds");
        }
        // if (!campground.author.equals(req.user._id)) {
        //     req.flash("error", "you aint allowed to does that!");
        //     return res.redirect(`/campgrounds/${id}`);
        // }
        res.render("campgrounds/edit", { campground });
    })
);

router.put(
    "/:id",
    isLoggedIn,
    validateCampground,
    catchAsync(async (req, res) => {
        // res.send("it worked"); // this is a test!!
        const { id } = req.params;
        // const campground = await Campground.findById(id);
        // if (!campground.author.equals(req.user._id)) {
        //     req.flash("error", "you aint allowed to does that!");
        //     return res.redirect(`/campgrounds/${id}`);
        // }
        const camp = await Campground.findByIdAndUpdate(id, {
            ...req.body.campground,
        });
        //... is the spread operator. Spreads into the object {...req.body.campground}
        req.flash("success", "Successfully updated camp!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.delete(
    "/:id",
    isLoggedIn,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted camp!");
        res.redirect("/campgrounds");
    })
);

module.exports = router;
