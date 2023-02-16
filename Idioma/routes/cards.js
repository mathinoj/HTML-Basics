const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Idioma = require("../models/idioma");
const {
    isLoggedIn,
    isAuthor,
    validateCard,
    paginate,
} = require("../middleware");

const db = mongoose.connection;

// const paginate = (req, res, next) => {
//     let perPage = req.query.selections || 3;
//     let page = parseInt(req.params.page) || 1;
//     let selection = req.query.selections;

//     Idioma.find({})
//         .skip(perPage * page - perPage) //THIS I BELIEVE SETS initial pg to 0, W/O i believe we don't get the the nxt btn to goto nxt pg.
//         .limit(perPage)
//         .exec(function (err, allCardsAgain) {
//             if (err) return next(err.message);
//             Idioma.count().exec(function (err, count) {
//                 if (err) return next(err.message);
//                 const matt = count / perPage;
//                 const roundedD = Math.ceil(matt);

//                 if (page > roundedD) {
//                     req.flash("error", "Page cannot be found!");
//                     return res.redirect("/cards");
//                 }

//                 //NEED TO WORK ON ERROR FOR IF USER TYPES IN SELECTION NUMBER IN URL THAT IS NOT AN ACTUAL SELECTION OPTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//                 //ACTUALLY THIS KINDA WORKS ALREADY, (the error handler above), but maybe do something specifically for the number options!!!!!!!!!!!!!!
//                 return res.render("cards/index", {
//                     allCards: allCardsAgain,
//                     pages: Math.ceil(count / perPage),
//                     roundedD,
//                     count,
//                     page,
//                     err,
//                     current: page,
//                     selection,
//                 });

//                 // }
//             });
//         });
//     //www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
//     // https://www.npmjs.com/package/mongodb-ejs-pagination
// };

// router.get("/", function (req, res, next) {
router.get("/", (req, res, next) => {
    paginate(req, res, next);
});

// router.get("/page/:page", function (req, res, next) {
router.get("/page/:page", (req, res, next) => {
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
