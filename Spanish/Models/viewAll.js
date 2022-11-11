const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpanishSchema = new Schema({
    card: String,
    english: String,
    spanish: String,
    // location: String,
});

module.exports = mongoose.model("Viewall", SpanishSchema);
