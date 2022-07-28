const express = require("express");
const app = express();
// console.dir(app);

app.use(() => {
    console.log("We got new request");
});
//anytime we have an incoming request ^callback will run

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
