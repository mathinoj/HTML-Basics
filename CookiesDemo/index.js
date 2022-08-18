const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.get("/greet", (req, res) => {
    res.send("Yo there");
});

app.get("/setname", (req, res) => {
    res.cookie("name", "stevie O");
    res.send("Sent cookie to cuz stevie");
});

app.listen(3000, () => {
    console.log("Swerving 3000");
});
