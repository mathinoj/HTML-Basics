const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Travelall = require("../models/viewAllTravel");
const Review = require("../models/review");
const { validateReview } = require("../middleware");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.post(
    "/",
    validateReview,
    catchAsync(async (req, res) => {
        const selectedTravel = await Travelall.findById(req.params.id);
        const review = new Review(req.body.review); //review is from review[...]
        selectedTravel.reviews.push(review);
        await review.save();
        await selectedTravel.save();
        req.flash("success", "Created a review.");
        res.redirect(`/travel/${selectedTravel._id}`);
        // res.send("you did it");
    })
);

router.delete(
    "/:reviewId",
    catchAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Travelall.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Borraste un review.");
        res.redirect(`/travel/${id}`);
        // res.send("deleted me");
    })
);

module.exports = router;
