const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Idioma = require("../models/idioma");
const User = require("../models/user");
const AddedCard = require("../models/addedCards");
const {
    isLoggedIn,
    isAuthor,
    validateCard,
    paginate,
    paginateTest,
} = require("../middleware");

const db = mongoose.connection;

// router.get("/", function (req, res, next) {
router.get(
    "/",
    catchAsync(async (req, res, next) => {
        paginate(req, res, next);
    })
);

// router.get("/page/:page", function (req, res, next) {
router.get("/page/:page", (req, res, next) => {
    paginate(req, res, next);
    // https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
});

router.get(
    "/tested",
    catchAsync(async (req, res, next) => {
        paginateTest(req, res, next);
    })
);

// router.get("/page/:page", function (req, res, next) {
router.get("/page/:page", (req, res, next) => {
    paginateTest(req, res, next);
    // https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291784#questions/1464534
});
// router.get(
//     "/",
//     catchAsync(async (req, res, next) => {
//         const allCards = await Idioma.find({});
//         console.log("ALLCARDS: " + allCards);

//         //THIS IS NOT WORKING. INSTEAD YOUR PAGINATE MIDDLEWARE IS DISPALYING THE INDEX PAGE
//         res.render("cards/index", { allCards });
//     })
// );

router.get(
    "/myCards",
    catchAsync(async (req, res, next) => {
        const myCards = await Idioma.find({}).populate("author");
        // console.log("myCards: " + myCards);

        if (!req.user) {
            req.flash("error", "Must be logged in!");
            return res.redirect(`/cards`);
        }

        let checkedBox = req.query.checkBoxer;
        console.log("chckB: " + checkedBox);
        //^^^ THIS FINDS THE ID OF THE CARD THAT IS CHOSEN BY THE USER

        let userSearches = req.query.searchy;
        // console.log("i: " + `'${userSearches}'`);
        let userSearching = `'${userSearches}'`;
        let userSearch = userSearching.toLowerCase();
        // console.log("userSrchez: " + userSearches); THIS DOESNT ADD THE ''
        console.log("userSEARCH: " + userSearch);
        const srchCz = await Idioma.find({});
        let srchToStrang = srchCz.toString();
        // console.log("reggy: " + srchCz);
        // console.log("strang: " + srchToStrang);
        // for (let strang of srchToStrang) {
        // console.log("starnge: " + strang);
        console.log("typeO: " + typeof userSearches);
        let you = srchCz.includes(userSearches);
        console.log("T or F: " + you);

        // if (typeof userSearches == "string") {
        if (typeof userSearches == "string" || userSearches == "undefined") {
            // console.log("starnge: " + strang);
            // console.log("userSERRRCH: " + userSearch);
            // req.flash("success", "Card found.");
            // console.log("it duz NOOOOT");
            console.log("it DUZUZZ");
            // return res.redirect("/cards/myCards");
            // } else {
            // console.log("it DUZUZZ");
            // console.log("it duz NOOOOT");
        }

        let getTestedCard = req.query.checkTester;
        // console.log("u: " + getTestedCard);

        let user = req.user._id;
        console.log("user is this: " + user);
        // let u = await AddedCard.find({});
        // console.log("AddedCard DB: " + u);
        // console.log("AddedCard DB nowUser: " + u.id);
        // for (let n of u) {
        //     console.log("N: " + n.nowUser);
        // }

        //START
        if (checkedBox) {
            const finding = await Idioma.findById(checkedBox);
            const ricky = await Idioma.findById(checkedBox).populate("author");
            let changedThisAsTest = ricky.author.id;
            let a = finding.author;
            let x = finding.addedCard;

            let y = x.includes(user);
            if (y == true) {
                req.flash("error", "Cant add, already gots!");
                return res.redirect("/cards");
            } else if (changedThisAsTest == user) {
                req.flash("error", "Cant add, own card!");
                return res.redirect("/cards");
            } else {
                let user = req.user._id;

                let findSelectedCard = await Idioma.findById(checkedBox);
                const addedCardy = await User.findById(user);
                findSelectedCard.addedCard.push(addedCardy);
                await findSelectedCard.save();

                // let findUser = await User.findById(req.user._id);
                // findUser.addedCard.push(findSelectedCard);
                // await findUser.save();

                req.flash("success", "Successfully added card to yours!");
                return res.redirect("/cards/myCards");
            }
        } else if (getTestedCard) {
            let findSelectedCardAgain = await Idioma.findById(getTestedCard);
            let findUser = await User.findById(req.user._id);
            findUser.addedCard.push(findSelectedCardAgain);

            await findUser.save();

            req.flash("success", "Added card to test cards!");
            return res.redirect("/cards/myCards");
        }
        // const showThem = await Idioma.find({});
        const showHim = await Idioma.find({}).populate("author");
        // console.log("shwM: " + showHim);
        const ill = req.user.addedCard;

        return res.render("cards/myCards", {
            myCards,
            // showThem,
            showHim,
            checkedBox,
            user,
            userSearch,
            userSearches,
            ill,
            you,
        });
    })
);

// router.get(
//     "/tested",
//     catchAsync(async (req, res, next) => {
//         if (!req.user) {
//             req.flash("error", "Must be logged in!");
//             return res.redirect(`/cards`);
//         }

//         res.locals.currentUser = req.user;
//         let entireUserInfo = res.locals.currentUser;
//         let userIdNum = entireUserInfo.id;

//         let randomDocsx = await User.findById(userIdNum).populate("addedCard");
//         // console.log("m: " + randomDocs.length);
//         // console.log("m addedC: " + m.addedCard);
//         // console.log("m addedC length: " + randomDocs.addedCard);
//         let randomDocs = randomDocsx.addedCard;
//         // let item = c[Math.floor(Math.random() * c.length)];
//         // console.log("item: " + item);

//         // let randomDocs = c
//         //     .sort(() => Math.random() - Math.random())
//         //     .slice(0, 5);
//         // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
//         console.log("shfld: " + randomDocs.length);

//         let tLength = randomDocs.length;

//         // const randomDocz = await db
//         //     .collection("idiomas")
//         //     // .aggregate([{ $sample: { size: randomRocs.length } }])
//         //     .aggregate([{ $sample: { size: 5 } }])
//         //     .toArray();
//         // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-sample
//         // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/#pipe._S_sample
//         // https://stackoverflow.com/questions/54585939/mongodb-and-node-js-aggregate-using-sample-isnt-returning-a-document

//         // const randArr = Array.from(randomDocs);

//         // let k = await Idioma.find({});

//         //COMMENTED OUT BELOW ON MAY 28 @ 1810
//         // for (let attempt of randomDocs) {
//         //     let q = attempt.addedCard;

//         //     let z = q.includes(userIdNum);

//         //     //THIS IS FOR FINDING AUTHOR OF CARD
//         //     let w = attempt.author;

//         //     let e = w.equals(userIdNum);
//         //     let v = attempt.author;
//         //     let n = attempt.addedCard;

//         //     const myArr = n.toString();

//         //     let x = v.equals(userIdNum);
//         //     let c = myArr.includes(userIdNum);
//         //     // console.log("Does AddedCard have User Id num: " + c);
//         //     if (x == true || c == true) {
//         //         // console.log("attmpt @@: " + attempt);
//         //         // console.log("length : " + randomDocs);
//         //     }
//         // }

//         return res.render("cards/tested", {
//             randomDocs,
//             userIdNum,
//             // attempt,
//         });
//     })
// );

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
        console.log("newCard here: " + newCard);
        //THIS PUTS CARD INTO addedCard in USER schema
        // let findUser = await User.findById(req.user._id);
        // findUser.addedCard.push(newCard);
        // await findUser.save();
        //^^^^TOOK OUT ABOVE CUZ WE ONLY WANT cards from MYCARDS PG THAT ARE CHOSEN BY USER TO GO TO USER SCHEMA
        //THIS PUTS THE CARD INTO THE ADDEDCARD MONGODB
        // const addIt = db.collection("addedcards");
        // let adder = { addedCard: newCard };
        // let result = addIt.insertOne(adder);
        // console.log("result: " + result);
        req.flash("success", "Successfully made new card!");
        res.redirect(`/cards/${newCard._id}`);
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res, next) => {
        const card = await Idioma.findById(req.params.id).populate("author");
        // console.log("CARD!!! " + card);
        // DONE AS TEST TO SEE all the 'author' info that we added in our IDIOMA.JS models. In the app-website click on card to see the CONSLOG
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
        console.log("this is card: " + card);
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

router.put(
    "/myCards/:id",
    isLoggedIn,
    catchAsync(async (req, res, next) => {
        res.locals.currentUser = req.user;
        let entireUserInfo = res.locals.currentUser;
        let userIdNum = entireUserInfo.id;
        // console.log("USER ID!!: " + userIdNum);
        let selectedCardIdNum = req.params.id;
        // console.log("CARD ID num: " + selectedCardIdNum);

        const specificCard = await Idioma.findById(selectedCardIdNum);
        console.log("This is specificCard selected by user: " + specificCard);
        let justSpecificCardId = specificCard.id;

        let userCard = await User.findById(userIdNum);
        console.log("userCard: " + userCard);

        let listOfAddedCardIds = specificCard.addedCard;
        let userListCards = userCard.addedCard;
        // console.log("userLcz :" + userListCards);

        let isUserInAddedCards = listOfAddedCardIds.includes(userIdNum);
        let isItInUser = userListCards.includes(justSpecificCardId);
        // console.log("isItin: " + isItInUser);
        // console.log("BLLLuuurt: " + isUserInAddedCards);
        if (
            (specificCard && isUserInAddedCards == true) ||
            isItInUser == true
        ) {
            // let hiii = await Idioma.findById(selectedCardIdNum);
            // console.log("hiii: " + hiii);

            await Idioma.findByIdAndUpdate(selectedCardIdNum, {
                $pull: { addedCard: userIdNum },
            });

            // await User.findByIdAndUpdate(userIdNum, {
            //     $pull: { addedCard: selectedCardIdNum },
            // });

            // let byee = await Idioma.findById(selectedCardIdNum);
            // console.log("byee: " + byee);

            req.flash("success", "Removed a Card.");
            res.redirect("/cards/myCards");
        }
    })
);

router.put(
    "/tested/:id",
    isLoggedIn,
    catchAsync(async (req, res, next) => {
        res.locals.currentUser = req.user;
        let entireUserInfo = res.locals.currentUser.id;
        console.log("entire: " + entireUserInfo);
        // let userIdNum = entireUserInfo.id;
        // console.log("USER ID!!: " + userIdNum);
        let selectedCardIdNumTest = req.params.id;
        console.log("selectFrmTst: " + selectedCardIdNumTest);

        // const specificCard = await Idioma.findById(selectedCardIdNumTest);
        // let justSpecificCardId = specificCard.id;

        let userCard = await User.findById(entireUserInfo);
        console.log("userCard: " + entireUserInfo);

        // let listOfAddedCardIds = specificCard.addedCard;
        let userListCards = userCard.addedCard;

        // let isUserInAddedCards = listOfAddedCardIds.includes(userIdNum);
        let isItInUser = userListCards.includes(selectedCardIdNumTest);
        if (isItInUser == true) {
            await User.findByIdAndUpdate(entireUserInfo, {
                $pull: { addedCard: selectedCardIdNumTest },
            });
            req.flash("success", "Removed a test Card.");
            res.redirect("/cards/tested");
        }
    })
);
module.exports = router;

//EXPRESS comes with EXPRESS ROUTER.
//routes help us clean up the app. it also makes things simpler
