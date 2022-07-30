const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
//after doing this we in terminal we installed 'npm i ejs'
//by installing it and setting 'view engine', 'ejs' express behind the scenes will require the package called EJS that we just installed in terminal
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    // res.send("Hi matt dogg");
    res.render("home.ejs");
    //default place it looks for is in views so we don't have to put 'views/home.ejs'
});

app.get("/cats", (req, res) => {
    const cats = ["blue", "jack", "bo", "moe", "amy"];
    res.render("cats", { cats });
});

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    res.render("subreddit", { subreddit });
});

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random", { rand: num });
});

app.listen(3000, () => {
    console.log("listening on port tree (3000) thousand");
});

//by default when we create a new express app and were using some 'view engine' express will assume that our views (templates) exist in a DIRECTORY called 'views' so in this case we have to 'mkdir views' in the terminal!!!

//after that go to terminal and do touch 'views/home.ejs' which will add the file to the views director/folder. Keep in mind that you can name the 'views' director/folder anything, but the default that EJS will look for is 'views'
