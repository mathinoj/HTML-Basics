const express = require("express");
const app = express();
const morgan = require("morgan");

// morgan("tiny"); not like this
//to use morgan as a middleware we have to tell the app to USE morgan
// app.use(morgan("tiny")); ******** CHANGED in Mod 421
//this logs every request. its useful when wanting to know which request came in.
//this is an example of an existing middleware that we install and use, overall morgan is a useful logging tool

// app.use(morgan("common"));

// app.use((req, res, next) => {
//     res.send("First MIDDLEware");
//     next();
// });
//this^^^ is a function that runs on EVERY single request

// app.use((req, res, next) => {
//     res.send("Second MIDDLEware");
//     next();
// });
//every function we define if we want it to be a middleware we follow the above signature. By executing 'next' we are calling whatever the next matching middleware or route handler is

// app.use((req, res, next) => {
//     res.send("Turd MIDDLEware");
//     next();
// });

//Mod 422
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

app.get("/", (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send("home page");
});

app.get("/dogs", (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send("Bark burk");
});

app.use((req, res) => {
    // res.send("UNfounded it");
    res.status(404).send("UNfounded it");
});

app.listen(3000, () => {
    console.log("Connizekted");
});
