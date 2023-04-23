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

        if (!req.user) {
            req.flash("error", "Must be logged in!");
            return res.redirect(`/cards`);
        }

        let checkedBox = req.query.checkBoxer;
        //^^^ THIS FINDS THE ID OF THE CARD THAT IS CHOSEN BY THE USER
        let user = req.user._id;
        console.log("user is this: " + user);
        let u = await AddedCard.find({});
        console.log("AddedCard DB: " + u);
        console.log("AddedCard DB nowUser: " + u.id);
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

                let findUser = await User.findById(req.user._id);
                findUser.addedCard.push(findSelectedCard);
                await findUser.save();

                req.flash("success", "Successfully added card to yours!");
                return res.redirect("/cards");
            }
        }
        // const showThem = await Idioma.find({});
        const showHim = await Idioma.find({}).populate("author");

        return res.render("cards/myCards", {
            myCards,
            // showThem,
            showHim,
            checkedBox,
            user,
        });
    })
);

router.get(
    "/tested",
    catchAsync(async (req, res, next) => {
        if (!req.user) {
            req.flash("error", "Must be logged in!");
            return res.redirect(`/cards`);
        }

        res.locals.currentUser = req.user;
        let entireUserInfo = res.locals.currentUser;
        // console.log("entierUserInfo: " + req.user.id);
        // console.log("CURRENT USER testtt: " + res.locals.currentUser);
        let userIdNum = entireUserInfo.id;

        let randomDocsx = await User.findById(userIdNum).populate("addedCard");
        // console.log("m: " + randomDocs.length);
        // console.log("m addedC: " + m.addedCard);
        // console.log("m addedC length: " + randomDocs.addedCard);
        let c = randomDocsx.addedCard;
        // let item = c[Math.floor(Math.random() * c.length)];
        // console.log("item: " + item);

        let randomDocs = c
            .sort(() => Math.random() - Math.random())
            .slice(0, 5);
        // c.sort(() => 0.5 - Math.random());
        console.log("shfld: " + randomDocs);

        // console.log("userIdNum: " + userIdNum);
        // const randomDocs = await Idioma.find({});
        // // console.log("RandomRocz: " + randomDocs);
        // for (let bby of randomDocs) {
        //     // console.log("BBY: " + bby);
        //     // console.log("rand length:  " + randomDocs.length);
        //     let matchy = bby.addedCard;
        //     // console.log("matchy: " + matchy);
        //     // console.log("matchy id: " + matchy.includes(userIdNum));
        //     let findUserInAdd = matchy.includes(userIdNum);
        //     // console.log("findUserInAdd: " + findUserInAdd);
        //     let bbyAuth = bby.author;
        //     // console.log("isAthr: " + bbyAuth);
        //     // console.log("user is auth: " + bbyAuth.equals(userIdNum));
        //     let tFinder = bbyAuth.equals(userIdNum);
        //     // console.log("Authfinder: " + tFinder);
        //     if (tFinder == true || findUserInAdd == true) {
        //         // console.log("findUserInAdd: " + findUserInAdd);
        //         // console.log("Authfinder: " + tFinder);
        //         // if (tFinder == true) {
        //         // let w = await Idioma.find({});
        //         // console.log("findUserInAdd: " + findUserInAdd);
        //         let b = { ...bby };
        //         console.log("WWW: " + b);
        //         // console.log("should only see AUTHRS card " + bby);
        //         // console.log("how many - LENGTH: " + Array.from(bby));
        //         // let y = { ...bby };
        //         // console.log("YY: " + y);
        //         // console.log("randomD.addC: " + randomDocs);
        //         // console.log("length: " + bby.length);
        //     }
        // }
        const randomDocz = await db
            .collection("idiomas")
            // .aggregate([{ $sample: { size: randomRocs.length } }])
            .aggregate([{ $sample: { size: 5 } }])
            .toArray();
        // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-sample
        // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/#pipe._S_sample
        // https://stackoverflow.com/questions/54585939/mongodb-and-node-js-aggregate-using-sample-isnt-returning-a-document
        // console.log("What this:" + randomDocs._id);
        // console.log("ConsLog: " + Array.from(randomDocs));
        // console.log("randomDocs: " + randomDocs);

        const randArr = Array.from(randomDocs);
        // console.log("randArr: " + randArr);
        // console.log("length: " + randArr.length);
        // for (let i = 0; i < randArr.length; i++) {
        // console.log(i);
        // console.log("randArr[i]: " + randArr[i]);
        // let s = await Idioma.find({}).populate("addedCard");
        // console.log("sss: " + s);
        // console.log("sss: " + s.author);
        // console.log("sss: " + s.addedCard);

        let k = await Idioma.find({});
        // console.log("AC: " + k);
        ///WHAT BOUT LIMITING THE NUMBER WE GET LIKE THROUGH THAT LOOP WHERE WE DO for(let i = 0; i < attempt; i++) CUZ I THINK YOU CAN LIMIT THE AMOUNT WE GET RATHER THAN SEEING ALL 8 CARDS THAT FIT YOUR CRITERIA
        // let b = k.length;

        // for (let i = 0; i < b; i++) {
        //     console.log("K length: " + i);
        // }

        // for (let attempt of randomDocs && k) {
        for (let attempt of randomDocs) {
            // console.log("attmpt: " + attempt);
            // console.log("this is IDs for ADDcard: " + attempt.addedCard);
            // console.log("user: " + userIdNum);
            // console.log("length : " + randomDocs.length);

            let q = attempt.addedCard;
            // console.log("addedCardID: " + q);
            // console.log("array: " + q.includes(userIdNum));
            // let mm = Object.entries(q);
            // let z = mm.includes(userIdNum);
            let z = q.includes(userIdNum);
            // console.log("Added card Id has user: " + z);
            // console.log("authorID: " + attempt.author);
            //THIS IS FOR FINDING AUTHOR OF CARD
            let w = attempt.author;
            // console.log("author: " + w);
            let e = w.equals(userIdNum);
            // console.log("Is AUTHOR: " + e);
            let v = attempt.author;
            // console.log("v: " + v);
            let n = attempt.addedCard;
            // console.log("ad JUST: " + attempt.english);
            // console.log("AddedCards Idz: " + n);
            const myArr = n.toString();
            // console.log("myArr: " + myArr);
            // console.log("Index Num of Added Card: " + n.indexOf(userIdNum));
            let x = v.equals(userIdNum);
            // console.log("X: " + x);
            let c = myArr.includes(userIdNum);
            // console.log("Does AddedCard have User Id num: " + c);
            if (x == true || c == true) {
                // if (e == true || z == true) {
                // console.log("see this????");
                // console.log("Author is user: " + e);
                // console.log("Added card has user: " + z);
                // console.log("attmpt @@: " + attempt);
                // console.log("length : " + randomDocs);
                // console.log("length author: " + attempt.author);
                // console.log("length addedC: " + attempt.addedCard);
                // let n = Iterators.size(attempt);
                // console.log("n: " + n);
                // console.log("aka: " + Array.from(k));
                // console.log("AC: " + k);
                // let f = await AddedCard.insert(
                //     {
                //         nowUser: userIdNum,
                //     },
                //     { addedCard: randomDocs }
                // );
                // console.log("f: " + f);
            }
        }
        // console.log("MATH: " + Math.floor(Math.random() * randArr.length));
        // const mathRand = Math.floor(Math.random() * randArr.length);
        // const blandArr = randArr[mathRand];
        // console.log("blandArr: " + blandArr);
        // console.log("Index: " + blandArr._id);
        return res.render("cards/tested", {
            randomDocs,
            // attempt,
            // k,
            // e,
            // z,
            userIdNum,
            // attempt,
        });
        //     }
        // }
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
        console.log("newCard here: " + newCard);
        //THIS PUTS CARD INTO addedCard in USER schema
        let findUser = await User.findById(req.user._id);
        findUser.addedCard.push(newCard);
        await findUser.save();
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
        console.log("userLcz :" + userListCards);

        let isUserInAddedCards = listOfAddedCardIds.includes(userIdNum);
        let isItInUser = userListCards.includes(justSpecificCardId);
        console.log("isItin: " + isItInUser);
        // console.log("BLLLuuurt: " + isUserInAddedCards);
        if (specificCard && isUserInAddedCards == true && isItInUser == true) {
            // let hiii = await Idioma.findById(selectedCardIdNum);
            // console.log("hiii: " + hiii);

            await Idioma.findByIdAndUpdate(selectedCardIdNum, {
                $pull: { addedCard: userIdNum },
            });

            await User.findByIdAndUpdate(userIdNum, {
                $pull: { addedCard: selectedCardIdNum },
            });

            // let byee = await Idioma.findById(selectedCardIdNum);
            // console.log("byee: " + byee);

            req.flash("success", "Removed a Card.");
            res.redirect("/cards/myCards");
        }
    })
);

module.exports = router;

//EXPRESS comes with EXPRESS ROUTER.
//routes help us clean up the app. it also makes things simpler
