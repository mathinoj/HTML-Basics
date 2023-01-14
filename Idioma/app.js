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
const { cardSchema } = require("./schemas.js");
mongoose.connect("mongodb://localhost:27017/idioma", {});

const cards = require("./routes/cards"); //added mod 489

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
app.use(flash());

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
