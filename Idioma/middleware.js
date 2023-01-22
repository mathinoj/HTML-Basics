module.exports.isLoggedIn = (req, res, next) => {
    //we export this middleware by doing module.exports.isLoggedIn, but then we have to import it on the cards.js and which ever other router/router-file we want to use this middleware.
    if (!req.isAuthenticated()) {
        //'isAuthenticated()', has to deal with how information is stored/retrieved from the session. This method is automatically added to the REQUEST object itself.
        req.flash("error", "Must be signed in!");
        return res.redirect("/login");
    }
    next();
};

//we create this middleware so we can use it on any ROUTE where we want to ensure a user MUST be logged in before they can access the route!
