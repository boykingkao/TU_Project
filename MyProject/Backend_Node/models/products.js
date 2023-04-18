const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    productName: String,
    image: String,
    detail: String,
    price: Number,
    owner: String,
    testImg: {data: Buffer, contentType: String},
   

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
