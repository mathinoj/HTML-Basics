const mongoose = require("mongoose");
const Schema = mongoose.Schema; //will reference this a lot when we get to relationships

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);