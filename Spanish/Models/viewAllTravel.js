const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;
const Review = require("./review");

SpanishSchemaAlso.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            },
        });
    }
});

const SpanishSchemaAlso = new SchemaToo({
    image: String,
    title: String,
    description: String,
    location: String,
    reviews: [
        {
            type: SchemaToo.Types.ObjectId,
            ref: "Review",
        },
    ],
});

module.exports = mongoose.model("Travelall", SpanishSchemaAlso);
