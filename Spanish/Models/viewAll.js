const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spanishSchema = new Schema({
    english: String,
    spanish: String,
});

module.exports = mongoose.model("viewAll", spanishSchema);
