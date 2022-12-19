const mongoose = require("mongoose");
const Schema = mongoose.Schema; // used as a shortcut cuz we reference this a lot

const LanguageSchema = new Schema({
    card: String,
    hint: String,
    english: String,
    spanish: String,
    hintOne: String,
    hintTwo: String,
});

module.exports = mongoose.model("Language", LanguageSchema);
