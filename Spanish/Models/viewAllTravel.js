const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;

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
