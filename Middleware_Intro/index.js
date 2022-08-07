const express = require("express");
const app = express();
const morgan = require("morgan");

// morgan("tiny"); not like this
//to use morgan as a middleware we have to tell the app to USE morgan
app.use(morgan("tiny"));
//this logs every request. its useful when wanting to know which request came in.
//this is an example of an existing middleware that we install and use, overall morgan is a useful logging tool

app.get("/", (req, res) => {
    res.send("home page");
});

app.get("/dogs", (req, res) => {
    res.send("Bark burk");
});

app.listen(3000, () => {
    console.log("Connizekted");
});
