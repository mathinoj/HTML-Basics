const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCard } = require("../middleware");
const Idioma = require("../models/idioma");
const { isLoggedIn } = require("../middleware");
const { rawListeners } = require("process");
const db = mongoose.connection;

const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(msg, 400);
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    } else {
        next();
    }
};

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const cardAuthor = await Idioma.findById(id);
    if (!cardAuthor.author.equals(req.user._id)) {
        req.flash("error", "Cant access!");
        return res.redirect(`/cards/${id}`);
    }
    next();
};

const paginate = (req, res, next) => {
    let perPage = 3;
    let page = req.params.page;

    // const allCards = await Idioma.find({}).skip(perPage * page).limit
    Idioma.find({})
        .skip(perPage * page)
        .limit(perPage)
        .exec(function (err, allCardsAgain) {
            if (err) return next(err.message);
            Idioma.count().exec(function (err, count) {
                if (err) return next(err.message);
                // res.render("cards/index", { allCards });
                res.render("cards/index", {
                    cards: allCardsAgain,
                    pages: count / perPage,
                });
            });
        });
    // https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
    // res.render("cards/index", { allCards });
};

router.get("/", function (req, res, next) {
    paginate(req, res, next);
});

router.get("/page/:page", function (req, res, next) {
    paginate(req, res, next);
    // https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
});

router.get(
    "/",
    catchAsync(async (req, res, next) => {
        const allCards = await Idioma.find({});

        res.render("cards/index", { allCards });
    })
);

router.get(
    "/tested",
    catchAsync(async (req, res, next) => {
        const randomRocs = await Idioma.find({});
        const randomDocs = await db
            .collection("idiomas")
            // .aggregate([{ $sample: { size: randomRocs.length } }])
            .aggregate([{ $sample: { size: 5 } }])
            .toArray();
        // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-sample
        // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/#pipe._S_sample
        // https://stackoverflow.com/questions/54585939/mongodb-and-node-js-aggregate-using-sample-isnt-returning-a-document
        // console.log("What this:" + randomDocs._id);
        // console.log("ConsLog: " + Array.from(randomDocs));
        const randArr = Array.from(randomDocs);
        console.log("randArr: " + randArr);
        console.log("length: " + randArr.length);
        for (let i = 0; i < randArr.length; i++) {
            // console.log(i);
            console.log(randArr[i]);
        }

        console.log("MATH: " + Math.floor(Math.random() * randArr.length));
        const mathRand = Math.floor(Math.random() * randArr.length);
        const blandArr = randArr[mathRand];
        console.log("blandArr: " + blandArr);
        console.log("Index: " + blandArr._id);
        res.render("cards/tested", { randomDocs });
    })
);

router.get(
    "/test/start",
    catchAsync(async (req, res, next) => {
        res.render(`cards/test`);
    })
);

router.get("/new", isLoggedIn, (req, res) => {
    res.render("cards/new");
});

router.post(
    "/",
    isLoggedIn,
    validateCard,
    catchAsync(async (req, res, next) => {
        const newCard = new Idioma(req.body.newCard);
        newCard.author = req.user._id;
        await newCard.save();
        req.flash("success", "Successfully made new card!");
        res.redirect(`/cards/${newCard._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res, next) => {
        const card = await Idioma.findById(req.params.id).populate("author");
        console.log("CARD!!! " + card); // DONE AS TEST TO SEE all the 'author' info that we added in our IDIOMA.JS models. In the app-website click on card to see the CONSLOG
        if (!card) {
            req.flash("error", "Card not found!");
            return res.redirect("/cards");
        }
        res.render("cards/show", { card });
    })
);

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        console.log("THIS ID: " + req.params.id);
        const newCard = await Idioma.findById(id);
        if (!newCard) {
            req.flash("error", "Card not found, so you cannot edit!");
            return res.redirect("/cards");
        }
        if (!newCard.author.equals(req.user._id)) {
            req.flash("error", "No se permites!");
            return res.redirect(`/cards/${id}`);
        }
        res.render("cards/edit", { newCard });
    })
);

router.put(
    "/:id",
    isLoggedIn,
    isAuthor,
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        // console.log("this is id: " + { id });
        const card = await Idioma.findById(id);
        if (!card.author.equals(req.user._id)) {
            req.flash("error", "Cant touch dis!");
            return res.redirect(`/cards/${id}`);
            //member, we put return so that we for sure know this code runs cuz without the RETURN this code would run and so would the other flash below
        }
        const cards = await Idioma.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        console.log("this is card: " + cards);
        req.flash("success", "Updated a Card!");

        res.redirect(`/cards/${card._id}`);
        console.log("here: " + card._id);
    })
);
//what we want to do first before we update anything, we wantto check if the card has the same AUTHOR-ID as the currently logged-in user (CURRENTUSER). To do this we need to break the findByIdAndUpdate into 2 steps, cuz its no longer good enough to update all at once.
//we want to find first AND THEN check to see if we can update, meaning if the author of that card we FOUND matches the currently logged-in user (currentUser) sending this request. Doing it all at once like we are currently doing doesnt give the app a chance to verify currentUser and card author.

//the new code that we put first in the router is saying "we're finding the cards. We're awaiting that, we're checking to see if you have the the correct authorization, cuz if so then you are allowed to update the card. If not, we redirect you."

//the next code would be saying but if you have the correct auhtorization and YOU DO update the card then we are going to find/update what we already found.

router.delete(
    "/:id",
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const deletedCard = await Idioma.findByIdAndDelete(id);
        req.flash("success", "Deleted a Card.");
        res.redirect("/cards");
    })
);

module.exports = router;

//EXPRESS comes with EXPRESS ROUTER.
//routes help us clean up the app. it also makes things simpler
