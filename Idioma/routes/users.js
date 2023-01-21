const express = require("express");
const router = express.Router();
const passport = require("passport");
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

            req.flash("success", "You have successfully reg'd");
            res.redirect("/cards");
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
        req.flash("success", "Welcome back!");
        res.redirect("/cards");
    }
);

//passport.authenticate is a middleware given by PASSPORT and it expects us to specify the strategy 'LOCAL'
//after LOCAL we have some options we can specify in an {object}. One of them is failuerFlash set to TRUE, which automatically flashes a message for us if there is a failure during the login. Then we add failureRedirect to redirect the user if something goes wrong with their login.
//however if the user is successul to login then we falsh the success flash with message and redirec the user to whereever we want, which in this case is the All Cards page.

module.exports = router;
