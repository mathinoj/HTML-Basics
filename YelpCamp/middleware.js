module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "must first be signed in");
        return res.redirect("/login");
    }
    next();
};
