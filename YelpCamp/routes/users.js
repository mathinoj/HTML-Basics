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
                if (err) return next(err);
                req.flash("success", "Welcome to camp");
                res.redirect("/campgrounds");
            });
            // console.log(registeredUser);
            // req.flash("success", "Welcome to camp");
            // res.redirect("/campgrounds");
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

// router.post(
//     "/login",
//     passport.authenticate("local", {
//         failureFlash: true,
//         failureRedirect: "/login",
//     }),
//     (req, res) => {
//         req.flash("success", "welcome back");
//         const redirectUrl = req.session.returnTo || "/campgrounds";
//         res.redirect(redirectUrl);
//     }
// );

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
        keepSessionInfo: true,
    }),
    (req, res) => {
        req.flash("success", "welcome back!");
        const redirectUrl = req.session.returnTo || "/campgrounds";
        delete req.session.returnTo; //this deletes from object
        res.redirect(redirectUrl);
    }
);

// router.get("/logout", (req, res, next) => {
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         req.flash("success", "Goodbye!");
//         res.redirect("/campgrounds");
//     });
// });

router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    });
});

module.exports = router;
