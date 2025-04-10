const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    image: {
        type: String,
        default: null
    }
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
