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
        // maxlength: 15,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be POSITIVE"],
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        },
    },
    size: {
        type: String,
        enum: ["S", "M", "L"],
    },
});
//Doing it like this allows the REQUIRED validation

// productSchema.methods.greet = function () {
//     console.log("Hellllllloooooowwwww");
//     console.log(`- FROM ${this.name}`);
// };

productSchema.methods.toggleOnSale = function () {
    this.onsale = !this.onsale;
    return this.save();
    // this.save() refers to the particular instance of product
};

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: "Mountain Bike" });
    // foundProduct.onSale = !foundProduct.onSale;
    // foundProduct.save();
    // ***********instead of doing the above two lines for an individual product you are extractign the logic and moving it onto the productSchema to an instance method so that there is access to it on every single instance of Product!
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory("Outdoors");
    console.log(foundProduct);
};

findProduct();

// const bike = new Product({
//     name: "Cycling Hat",
//     price: 22,
//     categories: ["Mountain", "Trail"],
//     size: "XL",
// });
// bike.save()
//     .then((data) => {
//         console.log("It Worked");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("Oh No Error");
//         console.log(err);
//     });

// Product.findOneAndUpdate(
//     { name: "Bike Pump" },
//     { price: -30.99 },
//     { new: true, runValidators: true }
// )
//     .then((data) => {
//         console.log("It Worked");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("Oh No Error");
//         console.log(err);
//     });
