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
    address: [
        {
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true,
            },
        },
    ],
});
