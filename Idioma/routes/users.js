const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const AddedCard = require("../models/addedCards");
const { checkReturnTo } = require("../middleware");

router.get("/register", (req, res) => {
    res.render("users/register");
});

// const addIt = db.collection("addedcards");
// let adder = { addedCard: newCard };
// let result = addIt.insertOne(adder);
// console.log("result: " + result);

router.post(
    "/register",
    catchAsync(async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            // const li = new User({ username });
            // console.log("li: " + li);
            // console.log("USERNAME: " + username);
            let x = new AddedCard();
            // x.nowUser = username;
            // x.nowUser.push(user); THISS WORKS BUT TREATS LIKE AN ARRAY!!
            // console.log("x: " + x);
            x.nowUser = user;
            const registeredUser = await User.register(user, password);
            await x.save();
            console.log("again x: " + x);

            // const newCard = new Idioma(req.body.newCard);
            // newCard.author = req.user._id;
            // await newCard.save();

            // console.log("regd: " + registeredUser);

            // const newCard = new Idioma(req.body.newCard);
            // newCard.author = req.user._id;
            // await newCard.save();
            // console.log("newCard here: " + newCard);

            // let findSelectedCard = await Idioma.findById(checkedBox);
            //     const addedCardy = await User.findById(user);
            //     findSelectedCard.addedCard.push(addedCardy);
            //     await findSelectedCard.save();

            // console.log("seeId: " + req.user._id);
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("success", "You have successfully reg'd");
                res.redirect("/cards");
            });
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login");
});

//THIS ROUTER.POST DOES THE LOGGING IN!
router.post(
    "/login",
    checkReturnTo,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    (req, res) => {
        // const { username } = req.body;
        // console.log("Username is: " + username);
        // req.flash("success", `Welcome back, ${username}!`);
        req.flash("success", `Welcome back`);

        // console.log("USER: " + User);
        const redirectUrl = res.locals.returnTo || "/cards";
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out!");
        res.redirect("/cards");
    });
});

module.exports = router;
