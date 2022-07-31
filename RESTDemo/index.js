const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
uuid();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "That funny",
    },
    {
        id: uuid(),
        username: "Rodd",
        comment: "That funnier",
    },
    {
        id: uuid(),
        username: "Maude",
        comment: "That funniest",
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid() });
    // res.send("Is twerking");
    res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render("comments/show", { comment });
    //Instead of 'show' it can be named anything
});

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
    // res.send("Updating sumtin");
    const { id } = req.params;
    // console.log(req.body.comment);
    const newCommentText = req.body.comment;
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter((c) => c.id !== id);
    res.redirect("/comments");
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
