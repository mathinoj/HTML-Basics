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
        // console.log("currentUserId: " + currentUserId);
        const showUsers = await User.find({});
        // console.log("showUsers: " + showUsers);
        const showFriend = await Friend.findById(currentUserId).populate(
            "requests"
        );
        console.log("showFrnd: " + showFriend);
        // console.log("friend: " + currentUserId);
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
            // let findSelectedCard = await Idioma.findById(checkedBox);
            // const addedCardy = await User.findById(user);
            // findSelectedCard.addedCard.push(addedCardy);
            // await findSelectedCard.save();
            // console.log("reqFrendID: " + requestFriend.id);
            //
            // let findSelectedCardAgain = await Idioma.findById(getTestedCard);
            // let findUser = await User.findById(req.user._id);
            // findUser.addedCard.push(findSelectedCardAgain);
            // await findUser.save();
            console.log("reqFREND: " + requestFriend);

            let iWantFriendId = requestFriend.id;
            console.log("userFriending: " + userFriending.id);
            // const friendingId = userFriending;
            // let findFriending = await Friend.findById(iWantFriendId);
            let findFriending = await Friend.findById(userFriending.id);
            console.log("findFriending: " + findFriending);
            let blu = findFriending.requests.push(requestFriend);
            console.log("blu: " + blu);
            await findFriending.save();
            // console.log("userFriendingID: " + userFriending.id);
            // console.log("userFriendingNAME: " + userFriending.username);
            console.log("reqFrnd: " + requestFriend);

            req.flash("success", "Sent request!");
            return res.redirect("/friend");
        }
        res.render("friends/yourFriends");
    })
);

module.exports = router;
