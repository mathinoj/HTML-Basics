const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({ _id: String });

module.exports = mongoose.model("Friend", FriendSchema);
