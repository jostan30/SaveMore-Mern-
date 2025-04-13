const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address:{type:String,required:true},
  status: {
    type: String,
    enum: ["available", "occupied", "inactive"],
    default: "available",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner-model", required: true }, 
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order-model" }], // Stores assigned orders
});

module.exports = mongoose.model("delivery-model", deliverySchema);