const express = require("express"); //1
const path = require("path"); //2
const mongoose = require("mongoose"); //3
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override"); //ADDDDDEEEEED
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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs"); //2
app.set("views", path.join(__dirname, "views")); //2

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); //ADDDDDEEEEED

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

app.get(
    "/campgrounds",
    catchAsync(async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", { campgrounds }); //added {campgrounds} 413
    })
);

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.post(
    "/campgrounds",
    catchAsync(async (req, res, next) => {
        if (!req.body.campground)
            throw new ExpressError("Invalid camp data", 400);
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

app.get(
    "/campgrounds/:id",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id);
        res.render("campgrounds/show", { campground });
    })
);

app.get(
    "/campgrounds/:id/edit",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id);
        res.render("campgrounds/edit", { campground });
    })
);

app.put(
    "/campgrounds/:id",
    catchAsync(async (req, res) => {
        // res.send("it worked"); // this is a test!!
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {
            ...req.body.campground,
        });
        //... is the spread operator. Spreads into the object {...req.body.campground}
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

app.delete(
    "/campgrounds/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        res.redirect("/campgrounds");
    })
);

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
