const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const review = require("../models/review");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Greatbye");
        res.redirect("/travel");
    });
});

router.post(
    "/register",
    catchAsync(async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password);
            req.flash("success", "Welcome, mayngs");
            res.redirect("/travel");
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
            // res.send(req.body);
        }
    })
);

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    (req, res) => {
        req.flash("success", "Welcome Back!");
        res.redirect("/travel");
    }
);

module.exports = router;
