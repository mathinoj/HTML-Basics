const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpanishSchema = new Schema({
    card: String,
    hint: String,
    english: String,
    spanish: String,
    hintOne: String,
    hintTwo: String,
    // card: [
    //     { english: String, spanish: String, hintOne: String, hintTwo: String },
    // ],
});

module.exports = mongoose.model("Viewall", SpanishSchema);

// const blogSchema = new Schema({
//     title: String, // String is shorthand for {type: String}
//     author: String,
//     body: String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//         votes: Number,
//         favs: Number,
//     },
// });
