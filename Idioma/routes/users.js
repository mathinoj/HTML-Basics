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

router.post(
    "/register",
    catchAsync(async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            //The next 3 lines add a new user to addedCard.js Schema *********
            // let x = await AddedCard();
            // x.nowUser = user;
            // await x.save();
            const registeredUser = await User.register(user, password);
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
