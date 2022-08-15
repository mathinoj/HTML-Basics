const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
    .connect("mongodb://localhost:27017/relationshipDemo")
    .then(() => {
        console.log("MONGO connex open");
    })
    .catch((err) => {
        console.log("ERROR with MONGO");
        console.log(err);
    });

//this is the ONE to...
const userSchema = new Schema({
    username: String,
    age: Number,
});

//this is the ...to MANY
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: "lilWayne", age: 38 });
//     const user = await User.findOne({ username: "lilWayne" });
//     const tweet2 = new Tweet({
//         text: "Shine from my head down to my shoes",
//         likes: 33,
//     });
//     tweet2.user = user;
//     user.save();
//     tweet2.save();
// };
// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate("user");
    // const t = await Tweet.findOne({}).populate("user", "username");
    console.log(t);
};
findTweet();
