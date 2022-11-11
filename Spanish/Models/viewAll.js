const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpanishSchema = new Schema({
    card: String,
    english: String,
    spanish: String,
});

module.exports = mongoose.model("viewall", SpanishSchema);