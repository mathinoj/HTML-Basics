const express = require("express"); //1
const path = require("path"); //2
const mongoose = require("mongoose"); //3
const ejsMate = require("ejs-mate");
// const Joi = require("joi"); Got rid cuz were exporting our schema from schemas file, and that depends on joi
const session = require("express-session"); //492
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override"); //ADDDDDEEEEED
const Campground = require("./models/campground"); //3
const Review = require("./models/review");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs"); //2
app.set("views", path.join(__dirname, "views")); //2

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); //ADDDDDEEEEED
app.use(express.static(path.join(__dirname, "public"))); //491

const sessionConfig = {
    secret: "shouldbebettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },

    //we want to have an expiration cuz otherwise someone could log in and stay logged in forever just by signing in.
};
app.use(session(sessionConfig)); //492

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

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

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);
//had to add router (ex /campgrounds) and a path to prefix them with which is campgrounds. So in campgrounds.js you gotta remove the campgrounds from /campgrounds in the campgrounds.js

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page no found", 404));
});
//After making delete we need to make a button to send the delete the request. Its a form that will send a post request to the "/campgroundS/:id" URL but its going to fake out express and make it think its a delete request cuz we have input the methodOverride

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh dang sometin went wrong!!!!!!";
    res.status(statusCode).render("error", { err });
});

//1
app.listen(3000, () => {
    console.log("CONNECTED port 3000");
});
