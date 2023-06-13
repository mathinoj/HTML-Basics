const express = require("express");
const router = express.Router();
// const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
const { checkReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const db = mongoose.connection;

router.get(
    "/friend",
    catchAsync(async (req, res, next) => {
        const showUsers = await User.find({});
        console.log("showUsers: " + showUsers);
        console.log("friend: " + req.user.id);
        res.render("friends/friend", { showUsers });

        // router.get(
        //     "/",
        //     catchAsync(async (req, res, next) => {
        //         const allCards = await Viewall.find({});
        //         res.render("cards/index", { allCards });
        //     })
        // );
        // res.render("cards/index", { allCards });
    })
);

module.exports = router;
