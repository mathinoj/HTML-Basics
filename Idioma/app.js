const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
//^^One of many engines used to run or PARSE and basically make sense of EJS
const Idioma = require("./models/idioma");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { cardSchema } = require("./schemas.js");
//we destructure here cuz we plan to have multiple schemas we'll export
mongoose.connect("mongodb://localhost:27017/idioma", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected!");
});
//This is the logic to check if there is an error or if there is successful connection

const app = express();

app.engine("ejs", ejsMate);
//^^Here we tell EXPRESS which one we want to use instead of the default one its relying on
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// When we have a post request and we want information from the post request body. We don't have access to request body immediately. It's just undefined, nothing is there. It's not going to be parsed. We need to tell express to use that middleware (parsing middleware).
app.use(methodOverride("_method"));

//we dont do app.use cuz we don't want this to run on every single route that we have. Instead we want this to be selectively applied, so we do this:
const validateCard = (req, res, next) => {
    //this is a middleware function so the signature must have (req, res, next)

    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(msg, 400); //THIS IS SAYING throw that new
        //WE DECIDE WHICH STATUS CODE TO GIVE.
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    } else {
        next();
        //we add the else{ next() } so that our route handler can actually work
    }
};

app.get("/", (req, res) => {
    // res.send("hello idiotma"); THIS WAS DONE AS A TEST TO SEE CONNECTION
    res.render("home");
});

app.get(
    "/cards",
    catchAsync(async (req, res, next) => {
        const allCards = await Idioma.find({});
        // console.log(allCards);
        // res.send("Everything her!");

        res.render("cards/index", { allCards });
    })
);

app.get(
    "/cards/test",
    catchAsync(async (req, res, next) => {
        // res.send("tester"); DID THIS FIRST as a TEST and CLICKED NAVBAR LINK

        const randomDocs = await db
            .collection("idiomas")
            .aggregate([{ $sample: { size: 1 } }])
            .toArray();
        // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-sample
        // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/#pipe._S_sample
        // https://stackoverflow.com/questions/54585939/mongodb-and-node-js-aggregate-using-sample-isnt-returning-a-document

        // console.log("randDUMB entries: " + randomDocs);

        res.render(`cards/test`, { randomDocs });
    })
);

app.get("/cards/new", (req, res) => {
    res.render("cards/new");
});

//12.31.2022 1114 - last thing we do is validate our CARD data when you post a new card or edit a card. NOW we need to work on client side validation!
//JOI is not specific to just EXPRESS, it's a javascript validator tool.

//RATHER THAN write code that checks for server side validation, which would mean it would likely be a bunch of if statements checking if the newCard had englihs, spanish, hintOne, etc. Rather than do that we use JOI, which makes it easier.
app.post(
    "/cards",
    validateCard,
    catchAsync(async (req, res, next) => {
        // if (!req.body.newCard) throw new ExpressError("Invalid Card Data", 400);
        // this ^^ is client side validation. That checks if a card actually exists, if a card is actually in the body! Checks if our request.body contains a card at all!

        const newCard = new Idioma(req.body.newCard);
        await newCard.save();

        // console.log(newCard);
        // res.send("makin card TEST 2");
        // console.log(req.body);
        // res.send("makin card TEST 1");
        res.redirect(`/cards/${newCard._id}`);
    })
);
//WE FIRST BUILD A MIDDLEWARE FOR ANYWHERE
// We're going to build a middleware and I'll call it something like Validate Card, and we'll just be able to use it on PUT/POST route and anywhere else where we would need to validate the req.body CARD and make sure all the important pieces are there. So we'll make a reusable function to do that.

app.get(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        // const { id } = req.params;
        // const card = await Idioma.findById(id);
        const card = await Idioma.findById(req.params.id);
        // console.log(card);
        // res.send("Specifc card page. More detailed.");
        res.render("cards/show", { card });
    })
);

app.get(
    "/cards/:id/edit",
    catchAsync(async (req, res, next) => {
        // const { id } = req.params;
        // const editCard = await Idioma.findById(id);
        const newCard = await Idioma.findById(req.params.id);
        res.render("cards/edit", { newCard });
    })
);

app.put(
    "/cards/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        //from a FORM we cant make a put request, which is why we'll need to do a METHOD OVERRIDE. npm i method-override --> will go in terminal. THEN we have to require it (see TOP)
        const { id } = req.params;
        console.log("this is id: " + { id });
        // const card = await Idioma.findByIdAndUpdate(id, req.body, {
        //passes is in ID and then pass in our DATA(req.body). So were taking the entire body of the EJS file
        //     runValidators: true,
        //     new: true,
        // });
        //first argument is ID, second arg is how we want to update, third is options
        const card = await Idioma.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        console.log("this is card: " + card);
        //we take in what is request.body.editCard
        //we use the ...(spread operator) because it takes in the properties, the key-value pairs from one area and copies/adds/combines them to the new object. So here it takes the the edit.ejs file and grabs the keys (textarea & input) and their values (whatever edits are made by user) and adds them to the new object (const card), which we

        //we copy everything over from req.body.editCard of the specific card which was gotten by the id paramater before it.
        res.redirect(`/cards/${card._id}`);
        console.log("here: " + card._id);
        //Do redirect cuz we don't want to send a POST request again (if we hit refresh it would make the same product again). Also we never send back an HTML response from a POST route (POST route is in edit.ejs). Therefore we redirect.
        // console.log(req.body); BEFORE ALL ABOVE, did these two as TEST!!
        // res.send("pUt!!");
    })
);

// You redirect just like when you create a new product because you don't want to be able to send that post request again to make a product. Just like we don't want to continuously update that product, although it's not an issue because you're just updating the same product.

//We have to decide whether we want to do a put or patch request for the EDIT!
//put request is replacing/overriding an object
//patch request is changing a portion of an object or document

// We could honestly get away with either one here. We do a put request because we are taking everything from this form, whatever the values are, and we're going to update the given product. Maybe we could have a route called Change Quantity, and we don't have quantity, but we could have a single route dedicated to changing category or quantity, in which case that would be a patch request most likely.

app.delete(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        // res.send("delete wrukin"); TEST 1
        const { id } = req.params;
        const deletedCard = await Idioma.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);

// app.get("/makeLanguage", async (req, res) => {
//     const langCard = new Language({
//         english: "hello",
//         spanish: "hola",
//     });
//     await langCard.save();
//     res.send(langCard);
// });

app.all("*", (req, res, next) => {
    next(new ExpressError("Page no find", 404)); //we can use this in app.use below
    //res.send("Your 404!"); //THIS IS DONE FIRST LIKE A TEST (mod 447). This is one option, to respond to an error here . like this. Or we can make use of the error class or ExpressError, which we do at the top in the required area.
    //for every path ('*') we call the call back (req, res, next)

    //we use the new ExpressError in the app.use where we can take the statusCode and message that we used in new ExpressError
});
//we use err from below, cuz were passing the new ExpressError-error to next (as seen above: next(new ExpressError...)). This new error hits the error handler (app.use), and err (in app.use) will be the ExpressError from app.all, OR it could be another error if it's coming from somewhere else
app.use((err, req, res, next) => {
    //this is a generic error handler
    //^^^ this is our error handler signature ^^^
    // const { statusCode = 500, message = "Something went wrong, mayngs!" } = err;
    //we add 500 and 'something went wrong' as defaults
    // res.status(statusCode).send(message);

    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!";
    res.status(statusCode).render("error", { err });
    // res.status(statusCode).render("error", { err });
    //instead of destructuring we pass the entire error {err} to the template like render("error", { err })
    // const { statusCode = 500, message = "Something Went Wrong!" } = err;
    //Here (like this above^^, which is the original line of code we had), where were setting the message wont work to update the error object ({err} <- where render('error', {err} IS)) . Were extracting a variable ('message =') from error ('= err') and giving that variable a default ('sumtin went wrong').

    //so like how it is now, we should be able to pass through the entire error {err} to our template (error.ejs is the template).
});
//this is our error handler

//We want to respond with a particular status code and some message. this is a generic thing done with web applications. There are several status codes to choose from and each have diff meanings

app.listen(3000, () => {
    console.log("Connected to pizort 3000!");
});
