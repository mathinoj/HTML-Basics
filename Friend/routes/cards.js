const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { cardSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Viewall = require("../models/viewAll");

const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};
