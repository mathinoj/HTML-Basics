const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpanishSchema = new Schema({
    english: String,
    spanish: String,
});

module.exports = mongoose.model("viewAll", SpanishSchema);
