const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    addedCard: [
        {
            type: Schema.Types.ObjectId,
            ref: "Idioma",
        },
    ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
//this allows us to use the USERSCHEMA where ever we we want

// const passport = require('passport')
// allows us to plug in multiple strategies for authentication.

// const LocalStrategy = require("passport-local"); -- has nothing to do with local-mongoose in the USERS.JS model
