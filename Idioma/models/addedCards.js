const mongoose = require("mongoose");
const Schema = mongoose.Schema; // used as a shortcut cuz we reference this a lot

const AddedCardSchema = new Schema({
    nowUser: {
        type: String,
        // ref: "User",
    },
    addedCard: {
        type: Schema.Types.ObjectId,
        ref: "Idioma",
    },
    originalAuthor: {
        type: String,
    },
});

module.exports = mongoose.model("AddedCard", AddedCardSchema);
