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
