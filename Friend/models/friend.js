const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    _id: String,
    userFriending: String,
    addedFriend: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = mongoose.model("Friend", FriendSchema);
