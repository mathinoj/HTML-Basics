const express = require("express");
const router = express.Router();

router.post(
    "/campgrounds/:id/reviews",
    validateReview,
    catchAsync(async (req, res) => {
        // res.send("You MAYD it");
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.delete(
    "/campgrounds/:id/reviews/:reviewId",
    catchAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId },
        });
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/campgrounds/${id}`);
    })
);

module.exports = router;
