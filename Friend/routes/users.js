const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { checkReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post(
    "/register",
    catchAsync(async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password);
            console.log(registeredUser);
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("success", "You have registered successfully!");
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

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    (req, res) => {
        req.flash("success", "Welcome Back!");
        res.redirect("/cards");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out.");
        res.redirect("/cards");
    });
});

module.exports = router;
