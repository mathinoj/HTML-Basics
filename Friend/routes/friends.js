const express = require("express");
const router = express.Router();
// const passport = require("passport");
const mongoose = require("mongoose");

const User = require("../models/user");
const Friend = require("../models/friend");
const { checkReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const Viewall = require("../models/viewAll");

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
            let findFriending = await Friend.findById(requestFriend.id);
            findFriending.requests.push(userFriending);
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
        res.locals.currentUser = req.user;
        let loggedInUser = res.locals.currentUser;
        let lookingAtRequest = loggedInUser.id;

        let see = await Viewall.find({});
        // console.log("see: " + see);
        // console.log("lookingAtRequest: " + lookingAtRequest);
        let yourRequesting = await Friend.findById(lookingAtRequest).populate(
            "requests"
        );
        let yourRequest = yourRequesting.requests;
        res.render("friends/yourFriends", { yourRequest });
    })
);

router.put(
    "/yourFriends/:id",
    // isLoggedIn,
    catchAsync(async (req, res, next) => {
        res.locals.currentUser = req.user;
        let entireUserInfo = res.locals.currentUser.id;
        console.log("entire: " + entireUserInfo);
        // let userIdNum = entireUserInfo.id;
        // console.log("USER ID!!: " + userIdNum);
        let selectedDeny = req.params.id;
        console.log("selectedDeny: " + selectedDeny);

        // const specificCard = await Idioma.findById(selectedCardIdNumTest);
        // let justSpecificCardId = specificCard.id;

        let personDenying = await Friend.findById(entireUserInfo);
        console.log("personDenying: " + personDenying);

        // let listOfAddedCardIds = specificCard.addedCard;
        let listOfRequests = personDenying.requests;
        console.log("listOfRequests: " + listOfRequests);

        // let isUserInAddedCards = listOfAddedCardIds.includes(userIdNum);
        let isItInUser = listOfRequests.includes(selectedDeny);
        console.log("isItInUser: " + isItInUser);
        if (isItInUser == true) {
            await Friend.findByIdAndUpdate(entireUserInfo, {
                $pull: { requests: selectedDeny },
            });
            req.flash("success", "Request DENIED!!");
            return res.redirect("/yourFriends");
        }
    })
);

module.exports = router;
