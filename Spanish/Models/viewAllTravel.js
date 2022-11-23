const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;
const Review = require("./review");

const SpanishSchemaAlso = new SchemaToo({
    image: String,
    title: String,
    description: String,
    location: String,
    author: {
        type: SchemaToo.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: SchemaToo.Types.ObjectId,
            ref: "Review",
        },
    ],
});

SpanishSchemaAlso.post("findOneAndDelete", async function (doc) {
    if (doc) {
        //if we find a doc
        await Review.deleteMany({
            _id: {
                $in: doc.reviews, //the id for each review is somewhere '$in' our doc.reviews
            },
        });
    }
});

//this doc has reviews and we delete all reviews where their id field is in our doc that we just deleted, in its reviews array

module.exports = mongoose.model("Travelall", SpanishSchemaAlso);
