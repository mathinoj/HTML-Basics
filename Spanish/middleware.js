const { spanishSchemaAlso, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Travelall = require("./models/viewAllTravel");

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
