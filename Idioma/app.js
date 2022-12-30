const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
//^^One of many engines used to run or PARSE and basically make sense of EJS
const Idioma = require("./models/idioma");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

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

app.post(
    "/cards",
    catchAsync(async (req, res, next) => {
        if (!req.body.newCard) throw new ExpressError("Invalid Card Data", 400);
        //IF req.body.newCard doesn't exist (if someone is trying to find a card that mabye was deleted). So if the card doesnt exist we throw a new ExpressError. You throw the ExpressError because it is inside an async function. It is thrown so the catchAsync function can catch it, and then hand it off to NEXT, which then makes its way down to the app.use(err, req, res...) function.
        //so in the error we specify the message.

        //all this basically means we have the infrastructure where we can throw one of these: new ExpressError('enter message here', enter statusCode here). Then it will make its way down to app.use where either use the message/statusCode we entered in ourselves, or rely on the default that we added to app.use if nothing was provided in the new ExpressError(message, statusCode) spots.

        //we set the statusCode in the response and send the message.

        //We throw the error cuz we are inside the async function, and you throw it. Then our catchAsync is going to catch the error and hand it off to NEXT, which makes its way to the app.use error handler signature we have at the bottom.
        // const newCard = new Idioma(req.body);
        // await newCard.save();
        const newCard = new Idioma(req.body.newCard);
        await newCard.save();

        // console.log(newCard);
        // res.send("makin card TEST 2");
        // console.log(req.body);
        // res.send("makin card TEST 1");
        res.redirect(`/cards/${newCard._id}`);
    })
);
// SEE UNDER: app.use(express.urlencoded({ extended: true }));

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
        const editCard = await Idioma.findById(req.params.id);
        res.render("cards/edit", { editCard });
    })
);

app.put(
    "/cards/:id",
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
            ...req.body.editCard,
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
    const { statusCode = 500, message = "Something went wrong, mayngs!" } = err;
    //we add 500 and 'something went wrong' as defaults
    res.status(statusCode).send(message);
    // res.send("Something went wrong!"); this was initial error msg we had
    //we dont hit this cuz were not handling the async error so in new card route we have to put try catch w/ (e)
    //STATUS sends back a status code
    //we destructure from error by doing the const { statusCode, etc...}
    //we use the statusCode and message from app.all
});
//this is our error handler

//We want to respond with a particular status code and some message. this is a generic thing done with web applications. There are several status codes to choose from and each have diff meanings

app.listen(3000, () => {
    console.log("Connected to pizort 3000!");
});
