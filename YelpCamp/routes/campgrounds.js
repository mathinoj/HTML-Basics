const express = require("express");
const router = express.Router({ mergeParams: true });
const campgrounds = require("../controllers/campgrounds"); //526
const catchAsync = require("../utils/catchAsync");
// const { campgroundSchema, reviewSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
//523^^ need to require author and validate

// const ExpressError = require("../utils/ExpressError"); not using got rid 523
const Campground = require("../models/campground");

router.get("/", catchAsync(campgrounds.index));
//^^526

// router.get("/new", isLoggedIn, (req, res) => {
// if (!req.isAuthenticated()) {
//     req.flash("error", "must be signed in");
//     return res.redirect("/login");
// }
//     res.render("campgrounds/new");
// });

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// router.post(
//     "/",
//     isLoggedIn,
//     validateCampground,
//     catchAsync(async (req, res, next) => {
//         // if (!req.body.campground)
//         //     throw new ExpressError("Invalid camp data", 400);

//         const campground = new Campground(req.body.campground);
//         campground.author = req.user._id;
//         await campground.save();
//         req.flash("success", "Successfully made a new camp!");
//         res.redirect(`/campgrounds/${campground._id}`);
//     })
// );

router.post(
    "/",
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.createCampground)
);

router.get("/:id", catchAsync(campgrounds.showCampground));

// router.get(
//     "/:id/edit",
//     isLoggedIn,
//     isAuthor, //523
//     catchAsync(async (req, res) => {
//         const { id } = req.params;
//         const campground = await Campground.findById(id);
//         if (!campground) {
//             req.flash("error", "Can't find that camp!");
//             return res.redirect("/campgrounds");
//         }
//         // if (!campground.author.equals(req.user._id)) { 523
//         //     req.flash("error", "you aint allowed to does that!"); 523
//         //     return res.redirect(`/campgrounds/${id}`); 523
//         // }
//         res.render("campgrounds/edit", { campground });
//     })
// );

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor, //523
    catchAsync(())

router.put(
    "/:id",
    isLoggedIn,
    isAuthor, //523
    validateCampground,
    catchAsync(async (req, res) => {
        // res.send("it worked"); // this is a test!!
        const { id } = req.params;
        // const campground = await Campground.findById(id);
        // if (!campground.author.equals(req.user._id)) {
        //     req.flash("error", "you aint allowed to does that!");
        //     return res.redirect(`/campgrounds/${id}`);
        // }
        const campground = await Campground.findByIdAndUpdate(id, {
            //523
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
    isAuthor, //523
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted camp!");
        res.redirect("/campgrounds");
    })
);

module.exports = router;
