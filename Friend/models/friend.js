const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({ _id: Number });

module.exports = mongoose.model("Friend", FriendSchema);

// const IdiomaSchema = new Schema({
//     card: String,
//     hint: String,
//     english: String,
//     spanish: String,
//     hintOne: String,
//     hintTwo: String,
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//     },
//     //this is a reference
//     number: {
//         type: Number,
//     },
//     addedCard: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "User",
//         },
//     ],
// });

// module.exports = mongoose.model("Idioma", IdiomaSchema);
