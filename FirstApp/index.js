const express = require("express");
const app = express();
// console.dir(app);

// app.use((req, res) => {
// console.log("We got new request");
// console.dir(req);
// res.send("We got your request. This is a response.");
// res.send({ color: "red" });
// res.send("<h1>My Webpage</h1>");
// });
//anytime we have an incoming request ^callback will run

app.get("/", (req, res) => {
    res.send("Homepage");
});

app.post("/cats", (req, res) => {
    res.send("Post request to /cats. Diff from get request");
});

app.get("/cats", (req, res) => {
    // console.log("Cat request");
    res.send("Meow");
});

app.get("/dogs", (req, res) => {
    res.send("Woof");
});

app.get("*", (req, res) => {
    res.send("No conozco ese calle");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
