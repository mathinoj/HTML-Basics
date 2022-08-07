const express = require("express"); //1
const app = express(); //1
const path = require("path"); //2

app.set("view engine", "ejs"); //2
app.set("views", path.join(__dirname, "views")); //2

//1
app.get("/", (req, res) => {
    // res.send("This be YELP camp");
    res.render("home");
});

//1
app.listen(3000, () => {
    console.log("CONNECTED port 3000");
});
