const mongoose = require("mongoose");
const SchemaToo = mongoose.Schema;
const Review = require("./review");

const ImageSchema = new SchemaToo({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const SpanishSchemaAlso = new SchemaToo(
    {
        // images: [{ url: String, filename: String }],
        title: String,
        images: [ImageSchema],
        geometry: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ["Point"], // 'location.type' must be 'Point'
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        description: String,
        location: String,
        author: {
            type: SchemaToo.Types.ObjectId,
            ref: "User",
        },
        reviews: [
            {
                type: SchemaToo.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    opts
);

SpanishSchemaAlso.virtual("properties.popUpMarkup").get(function () {
    return `<strong><a href="/travel/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 50)}...</p>`;
});

SpanishSchemaAlso.post("findOneAndDelete", async function (doc) {
    if (doc) {
        //if we find a doc
        await Review.deleteMany({
            _id: {
                $in: doc.reviews, //the id for each review is somewhere '$in' our doc.reviews
            },
        });
    }
});

//this doc has reviews and we delete all reviews where their id field is in our doc that we just deleted, in its reviews array

module.exports = mongoose.model("Travelall", SpanishSchemaAlso);
