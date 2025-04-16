const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const mongoose=require("mongoose");
const { loginOwner, registerOwner } = require('../controllers/authController');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const ownerModel=require('../models/owner-model')
const orderModel=require('../models/order-model')
router.get('/loggedIn',isLoggedInOwner);
router.post('/register', registerOwner);
router.post('/login',loginOwner);

router.get('/getOwners',async (req,res)=>{
    try {

        const data=await ownerModel.find();
        console.log("The data is",data);
        
        return res.json(data);
    } catch (error) {
        console.error("Error in fetching owners:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
    }

})
router.get('/fetchPurchaseOwner', async (req, res) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1]; // Extract token
      
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_KEY);
  
      // Find orders where the owner ID matches
      const orders = await orderModel.find({ owner: decoded.id })
        .populate('product', 'name price image')
        .sort({ purchaseDate: -1 }); // Most recent orders first
  
      if (!orders || orders.length === 0) {
        return res.status(200).json([]); // Return empty array instead of 404
      }
  
      const purchasedProducts = orders.map(order => ({
        _id: order._id, // Include order ID for updates
        productName: order.product?.name || "Product not found",
        productPrice: order.product?.price || 0,
        productImage: order.product?.image 
          ? order.product.image.toString('base64') // Convert buffer to base64
          : null, 
        buyerEmail: order.buyerEmail,
        buyerName: order.buyerName,
        quantity: order.quantity,
        purchasedDate: order.purchaseDate,
        paymentMethod: order.paymentMethod,
        status: order.status,
        address: order.shippingAddress, // Make sure this field exists in your model
      }));
  
      return res.json(purchasedProducts);
    } catch (error) {
      console.error("Fetch Purchase Error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  // Update order status
  router.put('/updateOrderStatus/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const token = req.headers["authorization"]?.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      
      // Validate the status
      const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      // Find the order and verify ownership
      const order = await orderModel.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Check if the logged-in user is the owner of this order
      if (order.owner.toString() !== decoded.id) {
        return res.status(403).json({ message: "Not authorized to update this order" });
      }
  
      // Update the order status
      order.status = status;
      await order.save();
  
      return res.status(200).json({ message: "Order status updated successfully", status });
    } catch (error) {
      console.error("Update Order Status Error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
module.exports = router;