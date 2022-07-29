const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hi matt dogg");
});

app.listen(3000, () => {
    console.log("listening on port tree (3000) thousand");
});
