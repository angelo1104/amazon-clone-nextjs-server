import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    products: [{
        productID: String,
        amount: String,
        price: String
    }],
    country: String,
    state: String,
    city: String,
    zip: String,
    totalPrice: String,
    status: String
})

const Order = mongoose.model("orders", orderSchema);

export default Order;