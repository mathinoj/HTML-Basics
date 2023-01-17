const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const Idioma = require("./models/idioma");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { cardSchema } = require("./schemas.js");
mongoose.connect("mongodb://localhost:27017/idioma", {});

const cards = require("./routes/cards"); //added mod 489
const passport = require("passport");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected!");
});

const app = express();

app.engine("ejs", ejsMate);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
// app.use(express.static("public")); TEST 2 MOD 491
//but then we add in this and we get the alert from TEST 1 MOD 491

app.use(express.static(path.join(__dirname, "public"))); //FINAL MOD 491

const sessionConfig = {
    secret: "exampleofsecretnottobedoneforreal",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));
//We just want to make sure app use session is there before passport session.********************jan172023 651pm
app.use(flash());

app.use(passport.initialize());
// Intializes Passport for incoming requests, allowing authentication strategies to be applied.
app.use(passport.session());
//A web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a session. Authenticated users need to be remembered across subsequent requests as they navigate the application.
//SO BASICALLY session keeps a user logged in to the website for every page that they browse. For example, WITHOUT SESSION if a user logged into their homepage but then went to a different page like a POST COMMENT page then they would be logged off or not acknowledged as logged in. SESSION makes sure this does not happen.
passport.use(new LocalStrategy(User.authenticate()));
// The LocalStrategy constructor takes a VERIFY function as an argument, which accepts username and password as arguments. When authenticating a request, the strategy parses a username and password, which are submitted via an HTML form to the web application. The strategy then calls the VERIFY function with those credentials. The VERIFY function is responsible for determining the user to which the username belongs, as well as verifying the password.

// this is saying hello passport we want you to use the localStrategy that we have downloaded and required. for the localStrategy the authentication method is going to be located on our user model and it's called AUTHENTICATE. HOWEVER we don't have a method on here (USERSCEHAM in USER.JS) called authenticate, at least not one that we made. Instead AUTHENTICATE is coming from this passport local mongoose on the docs, which are the static methods that have been added in automatically. Authenticate generates a function that is used in passports local strategy.

passport.serializeUser(User.serializeUser());
//This is telling passports how to serialize a user. And serialization refers to basically how do we get data or how do we store a user in the session.
passport.serializeUser(User.deserializeUser());
//How do you get a user out of that session.

//BOTH THESE methods have been added in from our passportLocalMongoose plugin in USERS.JS

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/cards", cards); //added mod 489

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page no find", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Connected to pizort 3000!");
});

//The idea of a session is that we store information on the server side and then we send a little cookie back to the client that says, Here's your key, here's the ID you need to unlock that session.
//But just remember this idea of having this cookie that is sent to my browser and this cookie does not contain any of the information in the session. The session can store a whole lot more information. I could have a whole shopping cart in there, but it does not send any of that data to me to be stored as a cookie. The only information it sends to me is this session ID. That session ID then is sent on every subsequent request. And then it's going to make sure, first of all, that it's not been tampered with and still is a valid session. ID It takes that and then it looks deep in this session store that it has and it tries to find information that corresponds to that ID and if it does, that's what we have access to in request session dot count

//http only if this is included the cookie cant be accessed through client-side scripts and as a result even if a cross-site scripting flaw exists and a user accidentally accesses a link that exploits this flaw, the browser will not reveal the cookie to the third party. THIS IS BASICALLY A security measure
// https://www.cookiepro.com/knowledge/httponly-cookie/
