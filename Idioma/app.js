const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
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

//It's not practical/secure to store a lot of data client-side using cookies. This is where sessions come in.
//Sessions are server-side data store that we use to make HTTP stateful.
//Instead of storing data using cookies, we store the data on the server-side and then send the browser a cookie that can be used to retrieve the data
// So Sessions, we store the actual data itself on the server side, not in the browser, which is what we do with cookies.
//The idea of a session is that we store information on the server side and then we send a little cookie back to the client that says, Here's your key, here's the ID you need to unlock that session.
//SESSIONS example with shopping cart. Say a new user is on a website and theyre adding things to their cart. Rather than having to register first in order to add to cart, the site lets them add to cart first and then the user can register. But rather than store this browser-side (through cookies), we store it server-side (sessions), which enables us to store a lot more data and more safely. Storing it through SESSIONS gives us an ID that we associate all information with (ex. everything inside the shopping cart). So your shopping in your browser, the server is going to send a little ID as a cookie, it's not going to send back the whole shopping cart (or any information in the session itself). Instead it sends back a KEY (ID) to unlock the shopping data, and the browser will store that little KEY(ID). Then on subsequent requests the browser will have the cookie that is your session ID (KEY), and then the server gets that on every single request. The server can then take that ID and then go to the session data store and retrieve all relevant information (ex all the shopping cart items you had).
//so we can store a ton of information on the server side that will persist.
//Instead of storing all that data in the browser as cookies and sending all of that information about the shopping cart with every single request, we can instead leave it on the server side and just send a single cookie that is going to sort of match us with our data in the data store.

//So in this video, we're going to install Express Session, which is one library, one tool we can use to implement sessions in an Express app. EXPRESS-SESSION is jut made to work with EXPRESS.

// So in this video, we're just going to add in express session to our application.And there's really two reasons. One is that I want to use flash so we can flash messages, and the other is that shortly we'll be adding authentication and we want session access for that as well.

//we need to pass in a secret because EXPRESS SESSION signs the cookies we get back

//But just remember this idea of having this cookie that is sent to my browser and this cookie does not contain any of the information in the session. The session can store a whole lot more information. I could have a whole shopping cart in there, but it does not send any of that data to me to be stored as a cookie. The only information it sends to me is this session ID. That session ID then is sent on every subsequent request. And then it's going to make sure, first of all, that it's not been tampered with and still is a valid session. ID It takes that and then it looks deep in this session store that it has and it tries to find information that corresponds to that ID and if it does, that's what we have access to in request session dot count

//http only if this is included the cookie cant be accessed through client-side scripts and as a result even if a cross-site scripting flaw exists and a user accidentally accesses a link that exploits this flaw, the browser will not reveal the cookie to the third party. THIS IS BASICALLY A security measure

//So we definitely want to have an EXPIRATION in there. Otherwise someone would basically just stay. Once we use it for authentication, they could stay logged in forever on a computer just by signing in once.

// RESAVE/SAVEunititialized are setup to make session deprecation warning go away (these are in the terminal)
