import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    products: [{
        productID: String,
        amount: String,
        price: String,
        name: String,
        avatar: String,
        brand: String
    }],
    country: String,
    state: String,
    city: String,
    zip: String,
    totalPrice: String,
    status: String,
    customerUid: String,
    paymentIntent: mongoose.Schema.Types.Mixed,
    date: mongoose.Schema.Types.Mixed,
})

const Order = mongoose.model("orders", orderSchema);

export default Order;