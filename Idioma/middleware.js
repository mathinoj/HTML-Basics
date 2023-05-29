const { cardSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Idioma = require("./models/idioma");
const User = require("./models/user");
const addedCards = require("./models/addedCards.js");

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
    console.log("cardAuth: " + cardAuthor);
    if (!cardAuthor.author.equals(req.user._id)) {
        req.flash("error", "Cant touch dis!");
        return res.redirect(`/cards/${id}`);
    }
    next();
    //this part will move the user on to the next routers, that they do have permission to move forward (w/ changing the card)
};

module.exports.paginate = async (req, res, next) => {
    // const paginate = (req, res, next) => {
    let perPage = req.query.selections || 4;
    let page = parseInt(req.params.page) || 1;
    let selection = req.query.selections;

    Idioma.find({})
        .skip(perPage * page - perPage) //THIS I BELIEVE SETS initial pg to 0, W/O i believe we don't get the the nxt btn to goto nxt pg.
        .limit(perPage)
        .exec(function (err, allCardsAgain) {
            if (err) return next(err.message);
            Idioma.count().exec(function (err, count) {
                if (err) return next(err.message);
                const matt = count / perPage;
                const roundedD = Math.ceil(matt);
                if (page > roundedD || selection > 9 || selection % 3) {
                    // if (selection % 3 == 0) {
                    req.flash("error", "Page cannot be found!");
                    return res.redirect("/cards");
                }

                // const checkD = addedCards.find({})

                return res.render("cards/index", {
                    allCards: allCardsAgain,
                    pages: Math.ceil(count / perPage),
                    roundedD,
                    count,
                    page,
                    err,
                    // current: page,
                    selection,
                    // checkD,
                });

                // }
            });
        });
    //www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
    // https://www.npmjs.com/package/mongodb-ejs-pagination
};

module.exports.paginateTest = async (req, res, next) => {
    // res.locals.currentUser = req.user;
    // let entireUserInfo = res.locals.currentUser;
    // console.log("let: " + entireUserInfo);
    // let userIdNum = entireUserInfo.id;

    if (!req.user) {
        req.flash("error", "Must be logged in!");
        return res.redirect(`/cards`);
    }

    res.locals.currentUser = req.user;
    let entireUserInfo = res.locals.currentUser;
    let userIdNum = entireUserInfo.id;

    let randomDocsx = await User.findById(userIdNum).populate("addedCard");
    // let randomDocsx = await User.findById(userIdNum);
    console.log("randomDocsx: " + randomDocsx.length);

    // console.log("m: " + randomDocs.length);
    // console.log("m addedC: " + m.addedCard);
    // console.log("m addedC length: " + randomDocs.addedCard);
    let randomDocs = randomDocsx.addedCard;
    // let item = c[Math.floor(Math.random() * c.length)];
    // console.log("item: " + item);
    let testLength = randomDocs.length;
    // let randomDocs = c
    //     .sort(() => Math.random() - Math.random())
    //     .slice(0, 5);
    // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    console.log("shfld: " + testLength);

    return res.render("cards/tested", {
        // allCards: allCardsAgain,
        // pages: Math.ceil(count / perPage),
        // roundedD,
        // count,
        // page,
        // err,
        // current: page,
        userIdNum,
        randomDocs,
    });
    // }
};
