const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cant be blank"],
    },
    password: {
        type: String,
        required: [true, "Password cant be blank"],
    },
});

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
};
//using the ternary operator (?) return either the entire user that was found cuz we may want to use that for something. Cuz we need the ID, the bare minimum to put that in the session. Or if it was invalide we return false.
//statics is where we can define multiple methods that will be added to the user class itself, to the model, not to the particular instance of user
//doing this, we have grouped the logic that has to do with our user model on the user model, plus it shortens the code a lil bit

module.exports = mongoose.model("User", userSchema);
