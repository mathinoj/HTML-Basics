const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/register", (req, res) => {
    res.sender("users/register");
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

module.exports = router;
