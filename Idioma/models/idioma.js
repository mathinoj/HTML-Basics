const mongoose = require("mongoose");
const Schema = mongoose.Schema; // used as a shortcut cuz we reference this a lot

const IdiomaSchema = new Schema({
    card: String,
    hint: String,
    english: String,
    spanish: String,
    hintOne: String,
    hintTwo: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    //this is a reference
    number: {
        type: Number,
    },
});

module.exports = mongoose.model("Idioma", IdiomaSchema);
