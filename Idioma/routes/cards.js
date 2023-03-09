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

router.get(
    "/",
    catchAsync(async (req, res, next) => {
        const allCards = await Idioma.find({});
        console.log("ALLCARDS: " + allCards);

        //THIS IS NOT WORKING. INSTEAD YOUR PAGINATE MIDDLEWARE IS DISPALYING THE INDEX PAGE
        res.render("cards/index", { allCards });
    })
);

// router.get(
//     "/allUsers",
//     catchAsync(async (req, res, next) => {
//         let checkB = req.query.checkBoxer;
//         console.log("CHECK-b: " + checkB);
//         let tryIt = await Idioma.findById(checkB);
//         console.log("TRY: " + tryIt);
//         console.log("REQ U: " + req.user._id);
//         // checkB.addedCard = req.idioma._id;
//         const blah = new AddedCard({});
//         console.log("BLAH: " + blah);
//         blah.nowUser = req.user._id;
//         blah.addedCard = tryIt;
//         await blah.save();
//         console.log("HER BLAH: " + blah);

//         // MIGHT BE SOMETHING LIKE THIS TO DISPLAY IN THE 'MY CARDS' LINK FOR THE USER
//         if (blah) {
//             // const { id } = req.user.id;
//             // const userCard = await Idioma.find({});
//             const showThem = await AddedCard.find({}).populate("addedCard");
//             console.log("showThem: " + showThem);

//             // const cond = await AddedCard.find(id);
//             // console.log("cond: " + cond);
//             // console.log("showThemUser: " + showThem.nowUser.id);
//             // const allUsers = await User.find({}).populate("addedCard");
//             // const allUsers = await User.findById(req.params.id).populate(
//             //     "addedCard"
//             // );
//             // const tryId = await AddedCard.find({});
//             // console.log("tryID: " + tryId);
//             // console.log("tryIDUSER: " + tryId.nowUser._id);

//             console.log("YOO: " + AddedCard.find({}));
//             req.flash("success", "Successfully added card to yours!");
//             // if (blah.addedCard.id === checkB) {
//             //     req.flash("error", "Cannot add. Card has already been selected!");
//             //     return res.redirect(`/cards`);
//             // }

//             // res.render("cards/allUsers", { tryIt, showThem, blah });
//             res.render("cards/myCards", { tryIt, showThem, blah });
//         } else {
//             res.redirect("cards/index");
//         }
//     })

//     // const newCard = new Idioma(req.body.newCard);
//     // newCard.author = req.user._id;
//     // await newCard.save();
//     // req.flash("success", "Successfully made new card!");
//     // res.redirect(`/cards/${newCard._id}`);

//     // nowUser: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: "User",
//     // },
//     // addedCard: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: "Idioma",
//     // },
// );

router.get(
    "/myCards",
    catchAsync(async (req, res, next) => {
        const myCards = await Idioma.find({}).populate("author");
        // console.log("myCz: " + myCards);

        // let page = req.params.page;
        // console.log("PG: " + page);

        if (!req.user) {
            req.flash("error", "Must be logged in!");
            return res.redirect(`/cards`);
        }

        let checkB = req.query.checkBoxer;
        console.log("cheQBBB: " + checkB);
        //^^^ THIS FINDS THE ID OF THE CARD THAT IS CHOSEN BY THE USER
        // const finding = await Idioma.find({}).populate("addedCard");
        // console.log("finding: " + finding);
        // for (let buh of finding) {
        //     // console.log("BUHH: " + buh);
        // }

        const findAdd = await Idioma.find({});
        for (let finder of findAdd) {
            let mat = finder.addedCardId;
            // console.log("mattyyy: " + mat);
            if (checkB && checkB == mat) {
                req.flash("error", "Cant add, already gots!");
                return res.redirect("/cards");
            }
        }
        const findOwnCrdz = await Idioma.find({});
        // console.log("findOwn: " + findOwnCrdz);
        for (let ownCard of findOwnCrdz) {
            let tam = ownCard.author;
            // console.log("TTTT: " + tam);
            let user = req.user._id;
            // console.log("userrrrrr: " + user._id);
            if (user == tam) {
                req.flash("error", "Cant add your OWN card!");
                return res.redirect("/cards");
            }
        }

        if (checkB) {
            let user = req.user._id;
            // console.log("uSSSER: " + user);
            // let addingTo = new AddedCard({});

            let tryIt = await Idioma.findById(checkB);
            console.log("TRY IT: " + tryIt);
            // const addedCarder = new AddedCard({});
            // const addedCard = new Idioma.find({});
            // const addedCard = new Idioma(tryIt);
            // const addedCardy = await User.findById(user);
            const addedCardy = await User.findById(user);
            console.log("ADDDEDCARDDD: " + addedCardy);

            // addingTo.nowUser = addedCardy;
            // addingTo.addedCard = tryIt;
            // await addingTo.save();
            // let getOrigAuth = tryIt.author;
            // let findOrigAuth = await User.findById(getOrigAuth);
            // let showOrigAuth = findOrigAuth.username;
            // addedCard.nowUser = req.user._id;
            // addedCard.addedCard = tryIt;
            // addedCard.addedCardId = checkB;
            // addedCard.originalAuthor = showOrigAuth;
            tryIt.addedCard.push(addedCardy);
            await tryIt.save();

            // const findAdd = await AddedCard.find({});
            // console.log("FINDaDD: " + findAdd);

            req.flash("success", "Successfully added card to yours!");
            return res.redirect("/cards");
        }

        // const finderKeep = async () => {
        //     const t = await Idioma.find({}).populate("addedCard");
        //     console.log("TTTTTT: " + t);
        // };
        // finderKeep();
        let user = req.user._id;
        console.log("uuuuusser: " + user);

        const showThem = await Idioma.find({}).populate("addedCard");
        // console.log("showTEM HERREE: " + showThem);
        // for (let x of showThem) {
        //     console.log("xer: " + x.addedCard);
        // }
        const showHim = await Idioma.find({});
        // console.log("showHIM: " + showHim);
        console.log("SHOWNhim: " + showHim);
        // const findByEd = await Idioma.findById(user).populate("addedCard");
        // console.log("findbyED: " + findByEd);
        // for (let x of findByEd) {
        //     console.log("xer: " + x);
        // }
        // for (let z of showThem) {
        //     // console.log("zzzz: " + z);
        //     console.log("zzzzADD: " + z.addedCard);
        //     console.log("req.user: " + z.addedCard.author);

        //     let p = z.addedCard.author;
        //     console.log("PPPP: " + p);

        //     let c = await User.findById(p);
        //     console.log("CCCCC: " + c.username);
        //     let x = c.username;
        //     console.log("XXX: " + x);
        // }
        // <h6 class="card-text"><%= showThems.addedCard.author%></h6>

        res.render("cards/myCards", { myCards, showThem, showHim });
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

module.exports = router;

//EXPRESS comes with EXPRESS ROUTER.
//routes help us clean up the app. it also makes things simpler
