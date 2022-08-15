const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/relationshipDemo")
    .then(() => {
        console.log("MONGO connex open");
    })
    .catch((err) => {
        console.log("ERROR with MONGO");
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id: false }, //this turns off adding the ID, if we want this
            street: String,
            city: String,
            state: String,
            country: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Potter",
    });
    u.addresses.push({
        street: "123 Sesame St.",
        city: "New York",
        state: "NY",
        country: "USA",
    });
    const res = await u.save();
    console.log(res);
};

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: "12 Third St.",
        city: "New York",
        state: "NY",
        country: "USA",
    });
    const res = await user.save();
    console.log(res);
};

addAddress("62fa065bdabe998af57f7cfd");
