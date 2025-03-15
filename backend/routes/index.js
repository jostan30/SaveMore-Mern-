const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

// Get all products from the shop
router.get('/shop', async (req, res) => {
  try {
    let products = await productModel.find();
    if (products.length===0) {
      return res.json({ success: false, message: "No Products yet" });
    }
    // Convert Buffer image to Base64 string
    const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      image: product.image.toString("base64"), // Convert Buffer to Base64
    }));
    return res.json(formattedProducts);
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Server error" });
  }
});

// Get products in the user's cart
router.get('/cart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findOne({ _id: decoded.id }).populate('cart.product_id');
    
    // Format cart products
    const formattedProducts = user.cart.map((item) => ({
      ...item.product_id.toObject(),
      quantity: item.quantity,
      image: item.product_id.image.toString("base64"), // Convert Buffer to Base64
    }));
    return res.json(formattedProducts);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

// Add a product to the cart
router.post('/addtocart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const { product_id, quantity } = req.body; // Extract product_id and quantity from request body

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findById(decoded.id).populate('cart.product_id'); // Populate cart with product details

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the cart
    const existingCartItemIndex = user.cart.findIndex(item => item.product_id.toString() === product_id);

    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity; // Add to the existing quantity
    } else {
      // Otherwise, add a new product to the cart with the given quantity
      user.cart.push({ product_id, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a product from the cart
router.get('/delete/:itemId', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header  
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findOne({ _id: decoded.id });

    // Ensure the itemId is an ObjectId (in case it's passed as a string in the URL)
    const itemId = new ObjectId(req.params.itemId);
    
    // Find the index of the item to be deleted using the item ID
    const itemIndex = user.cart.findIndex(item => item._id =itemId);


    if (itemIndex !== -1) {
      // Remove the item from the cart
      user.cart.splice(itemIndex, 1);
      await user.save();
      return res.status(200).json({ success: true, message: "Removed from cart successfully!" });
    } else {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
module.exports = router;
