const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/greet", (req, res) => {
    const { name = "Sin-Nombre" } = req.cookies;
    res.send(`Hey there, ${name}`);
});

app.get("/setname", (req, res) => {
    res.cookie("name", "stevie O");
    res.cookie("animal", "mini weenie");
    res.send("Sent cookie to cuz stevie");
});

app.listen(3000, () => {
    console.log("Swerving 3000");
});
