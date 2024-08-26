const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productDescription: {
    type: String,
  },
  stripeProductId: {
    type: String,
    unique: true,
  },
  productParamId: {
    type: String,
    unique: true,
  },
  productImages: [{ type: String }], 
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
