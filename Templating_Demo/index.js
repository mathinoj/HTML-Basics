const express = require("express");
const app = express();

app.set("view engine", "ejs");
//after doing this we in terminal we installed 'npm i ejs'
//by installing it and setting 'view engine', 'ejs' express behind the scenes will require the package called EJS that we just installed in terminal

app.get("/", (req, res) => {
    res.send("Hi matt dogg");
});

app.listen(3000, () => {
    console.log("listening on port tree (3000) thousand");
});

//by default when we create a new express app and were using some 'view engine' express will assume that our views (templates) exist in a DIRECTORY called 'views' so in this case we have to 'mkdir views' in the terminal!!!
