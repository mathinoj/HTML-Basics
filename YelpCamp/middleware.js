const { campgroundSchema, reviewSchema } = require("./schemas.js"); //523
const ExpressError = require("./utils/ExpressError"); //523
const Campground = require("./models/campground"); //523

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        // console.log(req.path, req.originalUrl);
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must first be signed in");
        return res.redirect("/login");
    }
    next();
};
module.exports.validateCampground = (req, res, next) => {
    //523
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    //523
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

//need to require these in campgrounds.js

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};
