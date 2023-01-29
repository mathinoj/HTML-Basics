const { cardSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Idioma = require("./models/idioma");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER: ", req.user); TEST MOD 517
    //we export this middleware by doing module.exports.isLoggedIn, but then we have to import it on the cards.js and which ever other router/router-file we want to use this middleware.
    if (!req.isAuthenticated()) {
        //'isAuthenticated()', has to deal with how information is stored/retrieved from the session. This method is automatically added to the REQUEST object itself.
        req.session.returnTo = req.originalUrl;
        req.flash("error", "Must be signed in!");
        return res.redirect("/login");
    }
    next();
};

//we create this middleware so we can use it on any ROUTE where we want to ensure a user MUST be logged in before they can access the route!

module.exports.checkReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(msg, 400);
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const cardAuthor = await Idioma.findById(id);
    if (!cardAuthor.author.equals(req.user._id)) {
        req.flash("error", "Cant touch dis!");
        return res.redirect(`/cards/${id}`);
    }
    next();
    //this part will move the user on to the next routers, that they do have permission to move forward (w/ changing the card)
};
