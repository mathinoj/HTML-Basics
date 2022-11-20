module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Must be signed in first, mayngs!");
        return res.redirect("/login");
    }
    next();
};
