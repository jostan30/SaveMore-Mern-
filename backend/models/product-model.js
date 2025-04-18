const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    image: Buffer,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    units: { type: Number, default: 1 },
    discount: { type: Number, default: 0 },
    ShopName: { type: String, required: true },
    Address: { type: String, required: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner-model", required: true },
    expiryDate: { type: Date }, // Store the actual expiry date
    daysRemaining: { type: Number } // Store the calculated days remaining

});

module.exports = mongoose.model("product-model", productSchema);