import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    owner: {
        name: String,
        email: String,
        uid: String,
    },
    helpers: [
        {
            name: String,
            email: String
        }
    ],
    product: {
        name: String,
        description: String
    },
    assets: {
        aboutImages: [String],
        thumbnail: [String]
    },
    address: String,
    status: String
});


const Product = mongoose.model('products', productSchema);

export default Product;