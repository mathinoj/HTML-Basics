const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");

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
    "/:id/reviews",
    validateReview,
    catchAsync(async (req, res) => {
        const selectedTravel = await Travelall.findById(req.params.id);
        const review = new Review(req.body.review); //review is from review[...]
        selectedTravel.reviews.push(review);
        await review.save();
        await selectedTravel.save();
        res.redirect(`/travel/${selectedTravel._id}`);
        // res.send("you did it");
    })
);

router.delete(
    "/:id/reviews/:reviewId",
    catchAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Travelall.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/travel/${id}`);
        // res.send("deleted me");
    })
);
