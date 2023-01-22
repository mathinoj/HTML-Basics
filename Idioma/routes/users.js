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
    catchAsync(async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, (err) => {
                //we call REQ.LOGIN after we have reg'd a user, and we pass in the registeredUser that we created above.
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
//when we create a new user the user is not kept logged in and instead they have to go back to the login page to log back in, which sucks its not conveneint.
//We want to fix this but we don't want to just flash a successful login and then redirect them to the login page
//instead we want to login them in upon creation of a user
//the way we do this is with the PASSPORT helper method called 'LOGIN', which establishes a login session.
//REQ.LOGIN is primarily used when users signup, during which REQ.LOGIN() can be invoked to autmotaically login the newly reg'd user.

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
        const { username } = req.body;
        console.log("Username is: " + username);
        req.flash("success", `Welcome back, ${username}!`);
        // console.log("USER: " + User);
        res.redirect("/cards");
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
