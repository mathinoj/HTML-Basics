const express = require("express"); //1
const path = require("path"); //2
const mongoose = require("mongoose"); //3
const ejsMate = require("ejs-mate");
// const Joi = require("joi"); Got rid cuz were exporting our schema from schemas file, and that depends on joi
const session = require("express-session"); //492
const flash = require("connect-flash"); //493
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override"); //ADDDDDEEEEED
const Campground = require("./models/campground"); //3
const Review = require("./models/review");
const passport = require("passport"); //510
const LocalStrategy = require("passport-local"); //511
const User = require("./models/user");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

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
app.use(flash()); //493

app.use(passport.initialize()); //510
app.use(passport.session()); //510 - needed if you want persistent login sessions
passport.use(new LocalStrategy(User.authenticate()));
// make sure this comes after app.use session
//whats being said is that hello passport, we'd like you to use the LocalStrategy that we've downloaded and required, and for that LocalStrategy the authentication method is going to be located on our user model and its gonna be called authenticate. We didnt make a authenticate method, but one does come from the passport-local-mongoose and its one of the static methods that is automatic

passport.serializeUser(User.serializeUser());
//this tells passport how to serialize a user. serialization refers to how do we store a user in the session
passport.deserializeUser(User.deserializeUser());
//how do you get user out of that session
//both methods are added in cuz of passport-local-mongoose

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    //^^with this we can go into the navbar.ejs and decide which ones we want to show depending on if there is a currentUser
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
    //these are accessible in every template
});

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

// app.get("/fakeUser", async (req, res) => {
//     const user = new User({ email: "matt@dogg.com", username: "mattdogg" });
//     const newUser = await User.register(user, "matt"); //checks if user name is unique
//     res.send(newUser);
// });

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
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
