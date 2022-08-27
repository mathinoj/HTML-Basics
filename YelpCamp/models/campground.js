const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema; //will reference this a lot when we get to relationships

const CampgroundSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String,
        },
    ],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    // console.log("D FREAKIN LETED");
    // console.log(doc);
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            },
        });
    }
});

//the id for each review is somewhere($in) our document.reviews(doc.reviews). The document is the array from the terminal/database. Were going to delete all reviews

//this is a query middleware and its going to pass in a document if it found a document and deleted it to the function

module.exports = mongoose.model("Campground", CampgroundSchema);
