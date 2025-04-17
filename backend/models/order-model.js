const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "user-model", required: true }, // Reference to User
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner-model", required: true }, // Reference to Owner
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product-model", required: true }, // Reference to Product
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: "delivery-model" },
    quantity: { type: Number, required: true, default: 1 },
    buyerName: { type: String, required: true }, // User's full name
    buyerEmail: { type: String, required: true }, // User's email for contact
    address: { type: String, required: true }, // Delivery address
    paymentMethod: { 
        type: String, 
        enum: ["credit-card", "paypal", "bank-transfer", "cash-on-delivery"], 
        required: true 
    }, // Payment method
    status: { 
        type: String, 
        enum: ["Pending", "Cancelled", "Shipped", "Delivered"], 
        default: "Pending" 
    }, // Order status
    
    purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order-model", orderSchema);
