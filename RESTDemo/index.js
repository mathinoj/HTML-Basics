const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
    {
        id: 1,
        username: "Todd",
        comment: "That funny",
    },
    {
        id: 2,
        username: "Rodd",
        comment: "That funnier",
    },
    {
        id: 3,
        username: "Maude",
        comment: "That funniest",
    },
    {
        id: 4,
        username: "Elrod",
        comment: "That funniester",
    },
];
//need to render these^^ in a template so do next--->
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments }); //dont have to do index
});

//below is the NEW /comments/new to GET - a Form to Create NEW comments
app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});

// below displays the user input and who the author is
app.post("/comments", (req, res) => {
    // console.log(req.body);
    const { username, comment } = req.body;
    comments.push({ username, comment });
    // res.send("Is twerking");
    res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === parseInt(id));
    res.render("comments/show", { comment });
    //Instead of 'show' it can be named anything
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
