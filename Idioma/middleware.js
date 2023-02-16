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

module.exports.paginate = async (req, res, next) => {
    // const paginate = (req, res, next) => {
    let perPage = req.query.selections || 3;
    let page = parseInt(req.params.page) || 1;
    let selection = req.query.selections;
    // let three = 3;
    // let six = 6;
    // let nine = 9;

    Idioma.find({})
        .skip(perPage * page - perPage) //THIS I BELIEVE SETS initial pg to 0, W/O i believe we don't get the the nxt btn to goto nxt pg.
        .limit(perPage)
        .exec(function (err, allCardsAgain) {
            if (err) return next(err.message);
            Idioma.count().exec(function (err, count) {
                if (err) return next(err.message);
                const matt = count / perPage;
                const roundedD = Math.ceil(matt);

                if (page > roundedD) {
                    req.flash("error", "Page cannot be found!");
                    return res.redirect("/cards");
                }
                //NEED TO WORK ON ERROR FOR IF USER TYPES IN SELECTION NUMBER IN URL THAT IS NOT AN ACTUAL SELECTION OPTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //ACTUALLY THIS KINDA WORKS ALREADY, (the error handler above), but maybe do something specifically for the number options!!!!!!!!!!!!!!
                return res.render("cards/index", {
                    allCards: allCardsAgain,
                    pages: Math.ceil(count / perPage),
                    roundedD,
                    count,
                    page,
                    err,
                    // current: page,
                    selection,
                });

                // }
            });
        });
    //www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
    // https://www.npmjs.com/package/mongodb-ejs-pagination
};
