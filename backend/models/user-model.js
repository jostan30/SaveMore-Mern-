const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product-model', required: true },
    quantity: { type: Number, default: 1 },
    name:{type:String,required:true}
});

const PurchasedItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product-model', required: true },
    quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        default: "user",
    },
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: Number,
    picture: String,
    cart: [cartItemSchema],  // Array of items in the cart
    purchasedProducts:  [PurchasedItemSchema]// Array of purchased products with quantity
});

module.exports = mongoose.model('user-model', userSchema);
