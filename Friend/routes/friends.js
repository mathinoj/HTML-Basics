const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
const { checkReturnTo } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

const db = mongoose.connection;

router.get("/friend", (req, res) => {
    res.render("friends/friend");
});

module.exports = router;
