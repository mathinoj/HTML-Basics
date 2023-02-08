const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Idioma = require("../models/idioma");
const { isLoggedIn, isAuthor, validateCard } = require("../middleware");

const db = mongoose.connection;

const paginate = (req, res, next) => {
    let perPage = 3;
    let page = parseInt(req.params.page);
    // console.log("payyyyge: " + page);
    // let page = parseInt(req.query.page);
    // let limit = parseInt(req.query.limit);
    // let startIndex = (page - 1) * limit;
    // let endIndex = page * limit;
    // console.log("startIndex: " + startIndex);
    // console.log("endIndex: " + endIndex);

    Idioma.find({})
        .skip(perPage * page)
        .limit(perPage)
        .exec(function (err, allCardsAgain) {
            if (err) return next(err.message);
            Idioma.count().exec(function (err, count) {
                if (err) return next(err.message);
                // res.render("cards/index", { allCards });
                const matt = count / perPage;
                const roundedD = Math.ceil(matt);
                // console.log("roundedD: " + roundedD);

                if (page > roundedD) {
                    req.flash("error", "Page cannot be found!");
                    return res.redirect("/cards");
                }
                for (let i = 0; i < roundedD; i++) {
                    return res.render("cards/index", {
                        allCards: allCardsAgain,
                        // pages: count / perPage,
                        // buzz,
                        lux: page + 1,
                        roundedD,
                        i,
                        // number,
                        // result,
                        page,
                    });
                }
            });
            console.log("isNaN: " + isNaN(page));
            console.log("page: " + page);
        });

    //www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
    // https: res.render("cards/index", { allCards });
};

router.get("/", function (req, res, next) {
    paginate(req, res, next);
});

// router.get("/page/:page", function (req, res, next) {
router.get("/page/:page", (req, res, next) => {
    // console.log("SEE THIS: " + page);
    paginate(req, res, next);
    // https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
    // const newCard = await Idioma.findById(id);
});

router.get(
    "/",
    catchAsync(async (req, res, next) => {
        // let { page, limit } = req.query;
        // if (!page) page = 1;
        // if (!limit) limit = 3;
        // const skip = (page - 1) * 3;
        const allCards = await Idioma.find({});
        // const allCards = await Idioma.find().skip(skip).limit(limit);

        res.render("cards/index", { allCards });
        // res.render("cards/index", {
        //     allCards: allCards,
        //     limit: limit,
        //     page: page,
        // });
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
        const card = await Idioma.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        console.log("this is card: " + cards);
        req.flash("success", "Updated a Card!");

        res.redirect(`/cards/${card._id}`);
        console.log("here: " + card._id);
    })
);

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
