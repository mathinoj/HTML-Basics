const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
userSchema.plugin(passportLocalMongoose);
//this is gonna add on to our schema a username, a field for password, make sure usernames are different/uniqure and give access to other things

module.exports = mongoose.model("User", userSchema);
