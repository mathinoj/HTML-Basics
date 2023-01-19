const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post(
    "/register",
    catchAsync(async (req, res) => {
        //we do this is by first making a basic user model instance where we pass in the username and the email but not the password, and then we call user register.
        try {
            const { email, username, password } = req.body;
            //here we destructured what we want from req.body, which is the form we created
            const user = new User({ email, username });
            //then we pass email/username in an object to new User, and then save that to a variable which here we name 'user'
            const registeredUser = await User.register(user, password);
            //this takes the new user that we just made (from above) and takes their password (the one they inputed on the form) and then stores the salt and the hash result on the new user.

            //we await it cuz this could take some time to process
            console.log(registeredUser);
            //this is to see what we end up with when a user submits their info
            req.flash("success", "You have successfully reg'd");
            res.redirect("/cards");
        } catch (e) {
            req.flash("error", "e.message");
            res.redirect("register");
        }
        //this takes the form data and creates a new user, this does not login
    })
);

module.exports = router;
