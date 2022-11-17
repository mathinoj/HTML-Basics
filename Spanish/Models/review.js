const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;

const reviewSchema = new SchemaToo({
    body: String,
    rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
