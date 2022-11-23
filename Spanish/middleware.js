const { spanishSchemaAlso, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Travelall = require("./models/viewAllTravel");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Must be signed in first, mayngs!");
        return res.redirect("/login");
    }
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
    }
    next();
};

///TRAVEL
module.exports.validateTravel = (req, res, next) => {
    const { error } = spanishSchemaAlso.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const editedTravel = await Travelall.findById(id);
    if (!editedTravel.author.equals(req.user._id)) {
        req.flash("error", "Cant touch this!");
        return res.redirect(`/travel/${id}`);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "Cant doez it!");
        return res.redirecrt(`/travel/${id}`);
    }
    next();
};
