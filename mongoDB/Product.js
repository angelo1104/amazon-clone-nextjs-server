import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  brand: String,
  pickupAddress: String,
  shortDescription: String,
  description: String,
  avatar: String,
  images: [String],
  price: String,
  searchTerm: String,
  ownerEmail: String,
  ownerUid: String,
  status: String,
  features: [String],
});

const Product = mongoose.model("products", productSchema);

export default Product;
