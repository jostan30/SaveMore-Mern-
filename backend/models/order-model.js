const mongoose = require("mongoose");

const OrderedtemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product-model', required: true },
    quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "user-model", required: true }, // Reference to User
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner-model", required: true }, // Reference to Owner
    orderProduct: [OrderedtemSchema], //contains products ordered 
    buyerName: { type: String, required: true }, // User's full name
    buyerEmail: { type: String, required: true }, // User's email for contact
    address: { type: String, required: true }, // Delivery address
    ToyalAmount :{type:Number , default:0} ,
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
    isPaid:{
        type:Boolean,
        default:false,
    },

    //payment results
    paymentResult: {              
        razorpay_payment_id: { type: String },
        razorpay_order_id: { type: String },
        razorpay_signature: { type: String },
        status: { type: String },
        email_address: { type: String }
      },
});

module.exports = mongoose.model("order-model", orderSchema);
