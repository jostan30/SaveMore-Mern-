const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product-model', required: true },
    quantity: { type: Number, default: 1 }
});

const purchasedProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product-model", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner-model", required: true },
    quantity: { type: Number, default: 1 },
    purchaseDate: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
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
    purchasedProducts: [purchasedProductSchema] // Array of purchased products
});

module.exports = mongoose.model('user-model', userSchema);
