const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post(
    "/register",
    catchAsync(async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password);
            console.log(registeredUser);
            req.flash("success", "Welcome to camp");
            res.redirect("/campgrounds");
            //if all goes well user will get redirected to /campgrounds
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
            //if error user will get redirected to register
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", (req, res) => {});

module.exports = router;
