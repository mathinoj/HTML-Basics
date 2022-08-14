const express = require("express");
const app = express();
const morgan = require("morgan");

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
    res.send("Need a p-word");
};

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

app.use((req, res) => {
    // res.send("UNfounded it");
    res.status(404).send("UNfounded it");
});

app.listen(3000, () => {
    console.log("Connizekted");
});
