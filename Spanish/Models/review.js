const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;

const reviewSchema = new SchemaToo({
    body: String,
    rating: Number,
    author: {
        type: SchemaToo.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", reviewSchema);
