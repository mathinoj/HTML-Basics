const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("thisismysecret"));

app.get("/greet", (req, res) => {
    const { name = "Sin-Nombre" } = req.cookies;
    res.send(`Hey there, ${name}`);
});

app.get("/setname", (req, res) => {
    res.cookie("name", "matt");
    res.cookie("animal", "mini weenie");
    res.send("Sent cookie to matt");
});

app.get("/getsignedcookie", (req, res) => {
    res.cookie("fruit", "grape", { signed: true });
    res.send("ok signed fruit cookie");
});

app.get("/verifyfruit", (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});

app.listen(3000, () => {
    console.log("Swerving 3000");
});
