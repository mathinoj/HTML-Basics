const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const Friend = require("../models/friend");
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
                // if (req.user.id) {
                //     const doc = new Friend();
                //     console.log("doc: " + doc);
                //     doc._id = req.user.id;
                //     await doc.save();
                // }
                res.redirect("/cards");
            });
            // if (req.user.id) {
            //     const doc = new Friend();
            //     doc._id = req.user.id;
            //     await doc.save();
            // }

            // console.log("req.user: " + req.user.id);
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("register");
        }
        // next();
        // console.log("req.user: " + req.user.id);
        // if (req.user.id) {
        //     const doc = new Friend();
        //     console.log("doc: " + doc);
        //     doc._id = req.user.id;
        //     await doc.save();
        // }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post(
    "/login",
    checkReturnTo,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    (req, res) => {
        req.flash("success", "Welcome Back!");
        const redirectUrl = res.locals.returnTo || "/cards";
        res.redirect(redirectUrl);
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
