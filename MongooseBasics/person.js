const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/shoApp")
    .then(() => {
        console.log("Connex open");
    })
    .catch((err) => {
        console.log("ERROR");
        console.log(err);
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String,
});
personSchema.virtual("fullName").get(function () {
    return `${this.first} ${this.last}`;
});

personSchema.pre("save", async function () {
    this.first = "Yo";
    this.last = "Mammy";
    console.log("bout to save");
});

personSchema.post("save", async function () {
    console.log("just saved");
});

const Person = mongoose.model("Person", personSchema);
