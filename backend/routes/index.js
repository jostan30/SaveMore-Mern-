const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const Razorpay = require("razorpay");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const orderModel = require('../models/order-model');
const ownerModel = require('../models/owner-model');
const deliveryModel = require('../models/delivery-model');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");

//For useAuth checks if the token exists in both owner and user and send the role if its found 
router.get('/verifyToken', async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.json({ success: false, message: "Token is missing" });
  }
  try {

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    let user = null;
    if (decoded.role === "user") {
      user = await userModel.findOne({ _id: decoded.id }).select("-password");
    } else if (decoded.role === "owner") {
      user = await ownerModel.findOne({ _id: decoded.id }).select("-password");
    }

    if (user && decoded.role === "user") {
      return res.status(200).json({ success: true, data: user, role: "user" });
    } else if (user) {
      return res.status(200).json({ success: true, data: user, role: "retailer" });
    }

    return res.status(401).json({ success: false, message: "No user found" })

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Token is invalid" });
  }
})

//Access Public
// Get all products from the shop
router.get('/shop', async (req, res) => {
  try {
    let products = await productModel.find();
    if (products.length === 0) {
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

//Access Private for Users
router.get('/cart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findOne({ _id: decoded.id }).populate('cart.product_id');
    //here populate was allowed because product_id ias an object reference
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format cart products
    const formattedProducts = user.cart.map((item) => ({
      ...item.product_id.toObject(),
      quantity: item.quantity,
      image: item.product_id.image.toString("base64"), // Convert Buffer to Base64
    }));

    return res.json(formattedProducts);
  } catch (error) {
    console.error("Cart error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get('/fetchPurchase', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Fetch orders with populated products
    const orders = await orderModel.find({ buyer: decoded.id }).populate({
      path: "orderProduct.product_id",
      model: "product-model",
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Create an array to store the purchased products without merging the existing products
    const purchasedProducts = [];

    orders.forEach(order => {
      order.orderProduct.forEach(item => {
        const product = item.product_id;
        const id = product?._id?.toString();

        if (!id) return;

        purchasedProducts.push({
          _id: id,
          productName: product?.name || "Product not found",
          productPrice: (product?.discount+(product?.discount*0.08))  || 0,
          productImage: product?.image?.toString('base64') || null,
          quantity: item.quantity || 0,
          orderDates: [order.purchaseDate || "Date not available"],
          orderStatuses: [order.status || "Status not available"],
          paymentMethods: [order.paymentMethod || "Not provided"],
          isPaid: order.isPaid || false,
        });
      });
    });

    return res.json({ purchasedProducts });
  } catch (error) {
    console.error("Get Purchased Products Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is missing" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const buyerId = decoded.id;

    const buyer = await userModel.findById(buyerId);
    if (!buyer) return res.status(404).json({ message: "User not found" });

    const cart = buyer.cart;
    const { checkoutInfo ,totalAmount } = req.body;
    if (!cart || cart.length === 0 || !checkoutInfo) {
      return res.status(400).json({ message: "Cart is empty or missing checkout info" });
    }

    const orderedItems = [];
    let ownerId = null;

    for (const item of cart) {
      const productDetails = await productModel.findById(item.product_id);
      if (!productDetails) throw new Error(`Product with ID ${item.product_id} not found`);

      orderedItems.push({
        product_id: productDetails._id,
        quantity: item.quantity || 1,
      });

     
      // Decrease stock
      await productModel.findByIdAndUpdate(productDetails._id, {
        $inc: { units: -(item.quantity || 1) },
      });

      // Set ownerId (assuming single-owner orders)
      if (!ownerId) ownerId = productDetails.owner;
    }

    const newOrder = new orderModel({
      buyer: buyer._id,
      owner: ownerId,
      orderProduct: orderedItems,
      buyerName: checkoutInfo.name,
      buyerEmail: checkoutInfo.email,
      address: checkoutInfo.address,
      paymentMethod: checkoutInfo.paymentMethod,
      ToyalAmount : totalAmount,
      status: "Pending",
      isPaid: false,
    });

    const savedOrder = await newOrder.save();
    console.log(savedOrder);

    // Update owner's orders
    await ownerModel.findByIdAndUpdate(ownerId, { $push: { orders: savedOrder._id } });

    // Add to user's purchase history
    const purchasedItems = orderedItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    await userModel.findByIdAndUpdate(buyerId, {
      $push: { purchasedProducts: { $each: purchasedItems } },
      $set: { cart: [] }, // clear cart
    });

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    return res.status(201).json({
      amount: razorpayOrder.amount,
      message: "Order placed successfully",
      order: savedOrder,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add a product to the cart
router.post('/addtocart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const { product_id, quantity, name } = req.body; // Extract product_id and quantity from request body

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    let user = await userModel.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the cart
    const existingCartItemIndex = user.cart.findIndex(
      item => item.product_id.toString() === product_id.toString()
    );
    //console.log("Existing Cart Item:", user.cart);


    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity; // Add to the existing quantity
    } else {
      // Otherwise, add a new product to the cart with the given quantity
      user.cart.push({ product_id, quantity, name });
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
    const itemIndex = user.cart.findIndex(item => item._id = itemId);


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

router.post("/deliveryRegister", async (req, res) => {
  try {
  
    let { name, contact, address, owner } = req.body;

    let deliveryAgent = await deliveryModel.findOne({ name });
    if (deliveryAgent) {
      return res.json({ success: false, message: "User already exists" })
    }
    else {
      deliveryAgent = await deliveryModel.create({
        name,
        contact,
        address,
        owner,
      })
      return res.json({ success: true, msg: "User craeted successfully" });
    }
  } catch (error) {
    console.log("The server side error is", error);

    return res.json({ success: false, msg: "Server side error" });
  }
});


module.exports = router;
