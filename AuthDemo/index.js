const express = require("express");
// const { default: mongoose } = require("mongoose");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose
    .connect("mongodb://localhost:27017/authDemo")
    .then(() => {
        console.log("MONGO connex open");
    })
    .catch((err) => {
        console.log("ERROR with MONGO");
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
//req.body isnt being parsed so thats why we add this ^ so that we parse the req.body
app.use(session({ secret: "notagoodsecret" }));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login");
    }
    next();
};

app.get("/", (req, res) => {
    res.send("This be homepage");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash,
    });
    await user.save();
    req.session.user_id = user._id; //505
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (validPassword) {
//         req.session.user_id = user._id;
//         res.redirect("/secret");
//     } else {
//         res.redirect("/login");
//     }
// });

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect("/secret");
    } else {
        res.redirect("/login");
    }
});

app.post("/logout", (req, res) => {
    // req.session.user_id = null; //THIS is the minimum that is needed
    req.session.destroy(); //this destroys session entirely. useful if you want to get rid of all information that was stored in that session
    res.redirect("/login");
});

// app.get("/secret", (req, res) => {
//     if (!req.session.user_id) {
//         return res.redirect("/login"); //506
//     }
//     res.render("secret"); //506
//     // res.send("This is a secret. Cant be seen unless logged in");
// });

//506
app.get("/secret", requireLogin, (req, res) => {
    res.render("secret");
});

app.get("/topsecret", requireLogin, (req, res) => {
    res.send("Top secretive");
});

app.listen(3000, () => {
    console.log("Serviendo 3000");
});
