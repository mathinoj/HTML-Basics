const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewAllSchema = new Schema({
    title: String,
    price: {
        type: Number,
    },
    // price: Number,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("viewAll", viewAllSchema);
