const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

app.use(morgan("tiny"));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use("/dogs", (req, res, next) => {
    console.log("Me amo perros");
    next();
});

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "mattdogg") {
        next();
    }
    throw new AppError("Password Required big doggy dogg", 401);
    // res.send("Need a p-word");
    // res.status(401);
    // throw new AppError(401, "Password Required big doggy dogg");
};

app.get("/error", (req, res) => {
    chicken.fly();
});

app.get("/", (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send("home page");
});

app.get("/dogs", (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send("Bark burk");
});

app.get("/secret", verifyPassword, (req, res) => {
    res.send("What it do, SECRET boo.");
});

app.get("/admin", (req, res) => {
    throw new AppError("You aint admin", 403);
});

app.use((req, res) => {
    // res.send("UNfounded it");
    res.status(404).send("UNfounded it");
});

// app.use((err, req, res, next) => {
//     console.log("*&^*(^&^*&^*^^*^*^&(^*^%&");
//     console.log("*&^*(^&^*&^*EEEEEERRRRRRRROOOOOOOOR^^*^*^&(^*^%&");
//     console.log("*&^*(^&^*&^*^^*^*^&(^*^%&");
// res.status(500).send("We got a problem my DOOD");
// next(); if next() is empty it will call in the next middleware (or next non-error handling middleware, which is the verifyPassword const). When working with errors we'll want to pass the error inside next
// next(err); this will call the next error handling middleware. If you dont call next(err) then you wont get the built-in error handler.
// });

app.use((err, req, res, next) => {
    const { status = 500, message = "Suttin went wrong" } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log("Connizekted");
});
