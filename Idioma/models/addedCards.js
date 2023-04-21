const mongoose = require("mongoose");
const Schema = mongoose.Schema; // used as a shortcut cuz we reference this a lot

const AddedCardSchema = new Schema({
    nowUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    addedCard: [
        {
            type: Schema.Types.ObjectId,
            ref: "Idioma",
        },
    ],
    // addedCardId: {
    //     type: String,
    // },
    // originalAuthor: {
    //     type: String,
    // },
});

module.exports = mongoose.model("AddedCard", AddedCardSchema);
