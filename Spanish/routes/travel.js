const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");
const { spanishSchemaAlso } = require("../schemas.js");
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
    // isLoggedIn,
    catchAsync(async (req, res) => {
        const viewAllTravel = await Travelall.find({});
        res.render("travel/index", { viewAllTravel });
    })
);

//TRAVEL
router.get("/new", isLoggedIn, (req, res) => {
    res.render("travel/new");
});

// router.get("/new", isLoggedIn, (req, res) => {
//     if (!req.isAuthenticated()) {
//         req.flash("error", "must be signed in");
//         return res.redirect("/login");
//     }
//     res.render("travel/new");
// });

///TRAVEL
router.post(
    "/",
    isLoggedIn,
    validateTravel,
    catchAsync(async (req, res, next) => {
        const newTravel = new Travelall(req.body.travel);
        newTravel.author = req.user._id;
        await newTravel.save();
        req.flash("success", "Successfully listed a travel!");
        res.redirect(`/travel/${newTravel._id}`);
    })
);

///TRAVEL
router.get(
    "/:id",
    // isLoggedIn,
    catchAsync(async (req, res) => {
        const viewTravelId = await Travelall.findById(req.params.id)
            .populate("reviews")
            .populate("author");
        console.log(viewTravelId);
        if (!viewTravelId) {
            req.flash("error", "No lo encuentra este viaje!");
            return res.redirect("/travel");
        }
        res.render("travel/show", { viewTravelId });
    })
);

///TRAVEL
router.get(
    "/:id/edit",
    isLoggedIn,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const editTravel = await Travelall.findById(id);
        if (!editTravel) {
            req.flash("error", "Cannot be founded!");
            return res.redirect("/travel");
        }
        if (!editTravel.author.equals(req.user._id)) {
            req.flash("error", "Cant touch this!");
            return res.redirect(`/travel/${id}`);
            //     ...req.body.travel,
        }
        res.render("travel/edit", { editTravel });
    })
);

///TRAVEL
// router.put(
//     "/:id",
//     isLoggedIn,
//     validateTravel,
//     catchAsync(async (req, res, next) => {
//         const { id } = req.params;
//         const editedTravel = await Travelall.findByIdAndUpdate(id, {
//             ...req.body.travel,
//         });
//         req.flash("Updated a travel!");
//         res.redirect(`/travel/${editedTravel._id}`);
//     })
// );

router.put(
    "/:id",
    isLoggedIn,
    validateTravel,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const editedTravel = await Travelall.findById(id);
        if (!editedTravel.author.equals(req.user._id)) {
            req.flash("error", "Cant touch this!");
            return res.redirect(`/travel/${id}`);
            //     ...req.body.travel,
        }
        const traveler = await Travelall.findByIdAndUpdateid(id, {
            ...req.body.travel,
        });
        req.flash("Updated a travel!");
        res.redirect(`/travel/${editedTravel._id}`);
    })
);

// if (!editedTravel.author.equals(req.user._id)) {
// }

//TRAVEL
router.delete(
    "/:id",
    isLoggedIn,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Travelall.findByIdAndDelete(id);
        req.flash("Deleted a travel.");
        res.redirect("/travel");
    })
);

module.exports = router;
