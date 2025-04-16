const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    role:{
        type:String,
        default: "owner",
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
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product-model" }] ,// Stores all products added by owner
    orders:[{type:mongoose.Schema.Types.ObjectId,ref:"order-model"}] //stores all recieved orders
});

module.exports = mongoose.model("owner-model", ownerSchema);
