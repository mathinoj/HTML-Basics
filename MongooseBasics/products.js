const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/shoApp")
    .then(() => {
        console.log("Connex open");
    })
    .catch((err) => {
        console.log("ERROR");
        console.log(err);
    });

// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
// });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
//Doing it like this allows the REQUIRED validation

const Product = mongoose.model("Product", productSchema);

const bike = new Product({ name: "Mountain Bike", price: 400 });
bike.save()
    .then((data) => {
        console.log("It Worked");
        console.log(data);
    })
    .catch((err) => {
        console.log("Oh No Error");
        console.log(err);
    });
