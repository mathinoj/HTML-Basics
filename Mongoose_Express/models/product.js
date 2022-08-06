const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: ["fruit", "vegetable", "dairy"],
        // An enum is a special "class" that represents a group of constants (unchangeable variables, like final variables).
    },
});
