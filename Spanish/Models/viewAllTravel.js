const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;

const SpanishSchemaAlso = new SchemaToo({
    image: String,
    title: String,
    description: String,
    location: String,

    // card: [
    //     { english: String, spanish: String, hintOne: String, hintTwo: String },
    // ],
});

module.exports = mongoose.model("Travelall", SpanishSchemaAlso);
