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

//before a user is saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    //were new going to set teh password to be whatever bcrypt gives us back when it hasshes the password thts currently in the user model
    next();
    //next is 'save' in this case
    //this referes to the particular user model, whatever the user is that is being saved, this refers to it. So this password is the pword we want to hash
});
//anytime we save a user this middleware runs, it runs pre-save
//even if we change a username and save, without the password being changed we dont want to rehash the password.
//we only want to rehash the password if the password has been modified. Therefore isModified will tell us true/false if password has been modified on this one particular user model. BUT If password has been modified were going to hash it with bcrypt then we update this.password to be the hash output
//then we call next which will call save.
//so either we just call save right away if the password is unchanged or we update the password to be the hash version and then we call save

module.exports = mongoose.model("User", userSchema);
