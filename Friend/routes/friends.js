const express = require("express");
const router = express.Router();
// const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
const Friend = require("../models/friend");
const { checkReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const db = mongoose.connection;

router.get(
    "/friend",
    catchAsync(async (req, res, next) => {
        res.locals.currentUser = req.user;
        let tryIt = res.locals.currentUser;
        let currentUserId = tryIt.id;
        const showUsers = await User.find({});
        const showFriend = await Friend.findById(currentUserId).populate(
            "requests"
        );
        console.log("showFrnd: " + showFriend);
        res.render("friends/friend", { showUsers, currentUserId });
    })
);

router.get(
    "/friend/:id",
    catchAsync(async (req, res, next) => {
        res.locals.currentUser = req.user;
        let userFriending = res.locals.currentUser;
        const requestFriend = await User.findById(req.params.id);
        if (requestFriend) {
            // let iWantFriendId = requestFriend.id;
            // console.log("userFriending: " + userFriending.id);
            let findFriending = await Friend.findById(userFriending.id);
            // console.log("findFriending: " + findFriending);
            findFriending.requests.push(requestFriend);
            await findFriending.save();
            req.flash("success", "Sent request!");
            return res.redirect("/friend");
        }
        // res.render("friends/yourFriends");
    })
);

router.get(
    "/yourFriends",
    catchAsync(async (req, res, next) => {
        res.render("friends/yourFriends");
    })
);

module.exports = router;
