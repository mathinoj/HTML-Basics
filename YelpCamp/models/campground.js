const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema; //will reference this a lot when we get to relationships

const ImageSchema = new Schema({
    url: String,
    filename: String,
});
//every image has a URL thats a string and a file name thats a string, and now images should be an array of images.

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});
//this refers to the particular image. replace finds the first match with the set property of "/upload".

//we use a virtual cuz we dont need to store it on the model or in the DB cuz its just derived from the information were already storing. were storing the URL. Were going to have to make a requrest to get the image anyway. It's not like were storing an image in MONGO, it's just the URL.

//can only add virtual properties to a SCHEMA. But we want a virtual property on each image.

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
    {
        title: String,
        images: [ImageSchema],
        geometry: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
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
    },
    opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `<strong><a href='/campgrounds/${
        this._id
    }'>${this.title}</a></strong>
    <p>${this.description.substring(0, 50)}...</p>`;
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
