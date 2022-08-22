module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        req.flash("error", "must first be signed in");
        return res.redirect("/login");
    }
    next();
};
