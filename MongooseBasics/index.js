const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/moviesApp")
    .then(() => {
        console.log("Connex open");
    })
    .catch((err) => {
        console.log("ERROR");
        console.log(err);
    });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});

//the name (ie 'Movie') should always be capitalized and singular (ex 'Dog'). Mongo will make a collection based off the name
const Movie = mongoose.model("Movie", movieSchema);
// const walle = new Movie({ title: "Walle", year: 2010, score: 8, rating: "R" });
//In the above two lines we call an instance of a model. When doing this you NEED to call SAVE in order for it to take effect and save to the DB.

//Using INSERTMANY directly inserts into our mongo DB
Movie.insertMany([
    { title: "Apollo 13", year: 1997, score: 9, rating: "PG-13" },
    { title: "Pi", year: 1987, score: 4, rating: "R" },
    { title: "Nope", year: 2022, score: 8, rating: "R" },
    { title: "Dumbo", year: 1992, score: 2, rating: "G" },
    { title: "Up", year: 2012, score: 7, rating: "G" },
]).then((data) => {
    console.log("It worked");
    console.log(data);
});
