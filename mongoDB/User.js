import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    seller: Boolean,
    uid: String,
    country: String,
    city: String,
    state: String,
    address: String,
    zip: String,
});

const User = mongoose.model('users',userSchema);

export default User;