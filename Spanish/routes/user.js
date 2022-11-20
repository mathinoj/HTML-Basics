const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.get("/login", (req, res) => {
    res.render("users/login");
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
