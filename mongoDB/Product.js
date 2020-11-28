import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    ownerName: String,
    ownerEmail: String,
    ownerUid: String,
    helpers: [
        {
            name: String,
            email: String
        }
    ],
    address: String,
    status: String,
    brand:  String,
    productName: String,
    shortDescription: String,
    description: String,
    thumbnail: String,
    images: [{
        id: String,
        url: String,
    }],
});


const Product = mongoose.model('products', productSchema);

export default Product;