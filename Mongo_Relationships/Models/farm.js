const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
    .connect("mongodb://localhost:27017/relationshipDemo")
    .then(() => {
        console.log("MONGO connex open");
    })
    .catch((err) => {
        console.log("ERROR with MONGO");
        console.log(err);
    });

// const productSchema = new mongoose.Schema({ CUZ OF LINE 2
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"],
    },
});

// const farmSchema = new mongoose.Schema({ CUZ OF LINE 2
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//     { name: "Goddess Melon", price: 4.99, season: "Summer" },
//     { name: "Orange", price: 2.99, season: "Winter" },
//     { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

// const makeFarm = async () => {
//     const farm = new Farm({ name: "Full Belly Farms", city: "San Anto, TX" });
//     const melon = await Product.findOne({ name: "Goddess Melon" });
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// };
// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: "Full Belly Farms" });
    const naval = await Product.findOne({ name: "Orange" });
    farm.products.push(naval);
    await farm.save();
    console.log(farm);
};
addProduct();
