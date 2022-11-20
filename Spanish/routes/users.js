const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
// const review = require("../models/review");

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
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("success", "Welcome, mayngs");
                res.redirect("/travel");
            });
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
            // res.send(req.body);
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
        keepSessionInfo: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome Back!");
        const redirectUrl = req.session.returnTo || "/travel";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
        // res.redirect("/travel");
    }
);

router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Greatbye");
        res.redirect("/travel");
    });
});

module.exports = router;
