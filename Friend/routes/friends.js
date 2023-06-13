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
        const currentUserId = req.user.id;
        console.log("reqID: " + currentUserId);
        const showUsers = await User.find({});
        // console.log("showUsers: " + showUsers);
        // console.log("friend: " + currentUserId);
        res.render("friends/friend", { showUsers, currentUserId });
    })
);

module.exports = router;
