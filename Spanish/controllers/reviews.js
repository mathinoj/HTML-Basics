const Review = require("../models/review");
const Travelall = require("../models/viewAllTravel");

module.exports.createReview = async (req, res) => {
    const selectedTravel = await Travelall.findById(req.params.id);
    const review = new Review(req.body.review); //review is from review[...]
    review.author = req.user._id;
    selectedTravel.reviews.push(review);
    await review.save();
    await selectedTravel.save();
    req.flash("success", "Created a review.");
    res.redirect(`/travel/${selectedTravel._id}`);
    // res.send("you did it");
};

module.exports.deleteTravel = async (req, res) => {
    const { id, reviewId } = req.params;
    await Travelall.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Borraste un review.");
    res.redirect(`/travel/${id}`);
    // res.send("deleted me");
};

module.exports = router;
