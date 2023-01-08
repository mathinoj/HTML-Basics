const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Idioma = require("./models/idioma");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { cardSchema } = require("./schemas.js");
mongoose.connect("mongodb://localhost:27017/idioma", {});

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

const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(msg, 400);
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    } else {
        next();
    }
};

app.get("/", (req, res) => {
    res.render("home");
});

app.get(
    "/cards",
    catchAsync(async (req, res, next) => {
        const allCards = await Idioma.find({});

        res.render("cards/index", { allCards });
    })
);

app.get(
    "/cards/test",
    catchAsync(async (req, res, next) => {
        const randomDocs = await db
            .collection("idiomas")
            .aggregate([{ $sample: { size: 1 } }])
            .toArray();
        // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-sample
        // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/#pipe._S_sample
        // https://stackoverflow.com/questions/54585939/mongodb-and-node-js-aggregate-using-sample-isnt-returning-a-document

        res.render(`cards/test`, { randomDocs });
    })
);

app.get("/cards/new", (req, res) => {
    res.render("cards/new");
});

app.post(
    "/cards",
    validateCard,
    catchAsync(async (req, res, next) => {
        const newCard = new Idioma(req.body.newCard);
        await newCard.save();

        res.redirect(`/cards/${newCard._id}`);
    })
);

app.get(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        const card = await Idioma.findById(req.params.id);
        res.render("cards/show", { card });
    })
);

app.get(
    "/cards/:id/edit",
    catchAsync(async (req, res, next) => {
        const newCard = await Idioma.findById(req.params.id);
        res.render("cards/edit", { newCard });
    })
);

app.put(
    "/cards/:id",
    validateCard,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        console.log("this is id: " + { id });

        const card = await Idioma.findByIdAndUpdate(id, {
            ...req.body.newCard,
        });
        console.log("this is card: " + card);

        res.redirect(`/cards/${card._id}`);
        console.log("here: " + card._id);
    })
);

app.delete(
    "/cards/:id",
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const deletedCard = await Idioma.findByIdAndDelete(id);
        res.redirect("/cards");
    })
);

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
