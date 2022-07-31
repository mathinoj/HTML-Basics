const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
    {
        username: "Todd",
        comment: "That funny",
    },
    {
        username: "Rodd",
        comment: "That funnier",
    },
    {
        username: "Maude",
        comment: "That funniest",
    },
    {
        username: "Elrod",
        comment: "That funniester",
    },
];
//need to render these^^ in a template so do next--->
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments }); //dont have to do index
});

app.get("/tacos", (req, res) => {
    res.send("Get /tacos response");
});

app.post("/tacos", (req, res) => {
    const { meat, qty } = req.body;
    // console.log(req.body);
    // res.send("POST /tacos response");
    res.send(`Here your ${qty} ${meat} tacos`);
});

app.listen(3000, () => {
    console.log("On port 3000");
});
