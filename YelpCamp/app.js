const express = require("express"); //1
const path = require("path"); //2
const mongoose = require("mongoose"); //3
const Campground = require("./models/campground"); //3

//3
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    // useNewUrlParser: true, HE DOES CUS HE HAS OLDER VERSION, u dnt need
    // useCreateIndex: true, HE DOES CUS HE HAS OLDER VERSION, u dnt need
    // useUnifiedTopology: true, HE DOES CUS HE HAS OLDER VERSION, u dnt need
});

//3
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected mayngs");
});

const app = express(); //1

app.set("view engine", "ejs"); //2
app.set("views", path.join(__dirname, "views")); //2

//1
// app.get("/makecampground", async (req, res) => {
//     //3
//     const camp = new Campground({
//         //3
//         title: "My B Yard",
//         description: "two trees to camp under",
//     });
//     await camp.save(); //3
//     // res.send("This be YELP camp");
//     // res.render("home");
//     res.send(camp); //3
// }); REMOVED IN SECTION 403!!!!!!!!!!!!!!!!!!!!!!!!!!

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campground/index");
});

//1
app.listen(3000, () => {
    console.log("CONNECTED port 3000");
});
