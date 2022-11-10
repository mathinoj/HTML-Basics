const express = require("express");
const app = express();
const path = require("path");

app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    // res.send("home landing");
    res.render("home");
});

app.listen(3000, () => {
    console.log("Connected port 3000");
});
