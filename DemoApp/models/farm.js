const mongoose = require("mongoose");
const { Schema } = mongoose;

const farmSchema = Schema({
    name: {
        type: String,
        required: [true, "Farm needs name!"],
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email Required"],
    },
});
