const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const orderModel=require('../models/order-model');
const ownerModel=require('../models/owner-model');
const deliveryModel=require('../models/delivery-model');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const mongoose=require("mongoose");

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
// router.get('/cart', async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
//     console.log("The token in cart is",token);
    
//     if (!token) {
//       return res.status(401).json({ message: "Token is missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     let user = await userModel.findOne({ _id: decoded.id }).populate('cart.product_id');
    
//     // Format cart products
//     const formattedProducts = user.cart.map((item) => ({
//       ...item.product_id.toObject(),
//       quantity: item.quantity,
//       image: item.product_id.image.toString("base64"), // Convert Buffer to Base64
//     }));
//     // console.log("The cart products returned from 3000 port are",formattedProducts);
    
//     return res.json(formattedProducts);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error });
//   }
// });
router.get('/cart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
    console.log("The token in cart is", token);
    
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
    console.log("The formatted products are",formattedProducts);
    
    return res.json(formattedProducts);
  } catch (error) {
    console.error("Cart error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



// router.get('/fetchPurchase',async(req,res)=>{
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
//     console.log("The token in buy is", token);
    
//     if (!token) {
//       return res.status(401).json({ message: "Token is missing" });
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     //here we have to populate all the object id again o retrieve desired fields
//     let user = await userModel.findOne({ _id: decoded.id })
//       .populate({
//         path: "purchasedProducts",
//         populate: [
//           { path: "product", select: "name price image  ShopName " }, // Get product details
//           { path: "owner", select: "email" } // Get owner details
//         ],
//       });
//       console.log("Fetched user:", user);
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     //user can access purchasedProducts.map only after populate otherwise undefined will return 
//     const purchasedProducts=user.purchasedProducts.map((item)=>({
//       productName: item.product?.name || "Product not found",
//       productPrice: item.product?.price || 0,
//       productImage: item.product?.image || "",
//       ownerShopName: item.owner?.ShopName || "Unknown",
//       ownerEmail: item.owner?.email || "No email",
//       quantity: item.quantity,
//       purchasedDate: item.purchaseDate,
//       paymentMethod: item.paymentMethod,
//       status: item.status,
//     }));
//     console.log("The purchased products in the buy are",user.purchasedProducts);
//     return res.json(purchasedProducts);
//   } catch (error) {
//     console.error("Cart error:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }

  
// })
router.get('/fetchPurchase', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token
    console.log("The token in buy is", token);

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Fetch purchases from the orders collection instead of users
    const orders = await orderModel.find({ buyer: decoded.id })
      .populate("product", "name price image") // Get product details
      .populate("owner", "email"); // Get owner details

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No purchases found" });
    }

    const purchasedProducts = orders.map(order => ({
      productName: order.product?.name || "Product not found",
      productPrice: order.product?.price || 0,
      productImage: order.product?.image 
        ? order.product.image.toString('base64') // Convert buffer to base64
        : "", 
      ownerEmail: order.owner?.email || "No email",
      quantity: order.quantity,
      purchasedDate: order.purchaseDate,
      paymentMethod: order.paymentMethod,
      status: order.status,
    }));

    console.log("The purchased products in the buy are", purchasedProducts);
    return res.json(purchasedProducts);
  } catch (error) {
    console.error("Fetch Purchase Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/checkout", async (req, res) => {   //use as post to buy a product
  try {
    // Extract and verify token
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token,process.env.JWT_KEY);
    const buyerId = decoded.id; // Assuming token contains user ID
    const buyer = await userModel.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Token verified, buyer:", buyer.email);

    // Extract checkout data
    const { selectedProduct, CartProduct, checkoutInfo } = req.body;
    const products = selectedProduct ? [selectedProduct] : CartProduct; // Ensure always an array

    if (!products || products.length === 0 || !checkoutInfo) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Create orders for each product
    const orderPromises = products.map(async (product) => {
      const productDetails = await productModel.findById(product._id);
      if (!productDetails) {
        throw new Error(`Product with ID ${product._id} not found`);
      }
      
      console.log("🔹 Processing order for product:", productDetails._id);
      console.log("🏭 Product Owner:", productDetails.owner);
      console.log("🔢 Quantity:", product.quantity || 1);
      console.log("👤 Buyer Name:", checkoutInfo.name);
      console.log("📧 Buyer Email:", checkoutInfo.email);
      console.log("📍 Address:", checkoutInfo.address);
      console.log("💳 Payment Method:", checkoutInfo.paymentMethod);

      const newOrder = new orderModel({
        buyer: buyer._id,
        owner: productDetails.owner, // Assuming product has an owner field
        product: productDetails._id,

        quantity: product.quantity || 1,
        buyerName: checkoutInfo.name, // FIXED: Changed from checkoutInfo.fullName
        buyerEmail: checkoutInfo.email,
        address: checkoutInfo.address,
        paymentMethod: checkoutInfo.paymentMethod,
        status: "Pending",
      });
// Reduce the product stock
await productModel.findByIdAndUpdate(product._id, {
  $inc: { units: -(product.quantity || 1) }
});
await ownerModel.findByIdAndUpdate(productDetails.owner,{
  $push:{orders:newOrder._id}
})
      return newOrder.save();
      
    });
  
    const savedOrders = await Promise.all(orderPromises);
    await userModel.findByIdAndUpdate(buyerId, {
      $push: { purchasedProducts: { $each: savedOrders.map(order => order._id) } }
    });
    
    return res.status(201).json({
      message: "Order placed successfully",
      orders: savedOrders,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// module.exports = router;

// Add a product to the cart
router.post('/addtocart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }
     console.log("THE TOKEN IN ADD TO CART API IS",token);
     
    const { product_id, quantity,name } = req.body; // Extract product_id and quantity from request body
    
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
      user.cart.push({ product_id, quantity ,name});
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

router.post("/deliveryRegister",async(req,res)=>{
  try {
    let {name,contact,address,owner}=req.body;

    let deliveryAgent=await deliveryModel.findOne({name});
    if(deliveryAgent){
       return res.json({success:false,message:"User already exists"}) 
      }
    else{
      deliveryAgent=await deliveryModel.create({
        name,
        contact,
        address,
        owner,
      })
      return res.json({success:true,msg:"User craeted successfully"});
    }
  } catch (error) {
    console.log("The server side error is",error);
    
    return res.json({success:false, msg: "Server side error" });
  }
})

router.post("/fetchDeliveryAgents", async (req, res) => {
  try {
    const { userData } = req.body; // Fixed from request.json() to req.body
    
    // Find delivery agents owned by this user with status "available"
    const deliveryAgents = await deliveryModel.find({
      owner: userData,
      status: "available"
    });
    
    if (!deliveryAgents || deliveryAgents.length === 0) {
      return res.status(404).json({ message: "No available delivery agents found" });
    }
    
    return res.status(200).json({ deliveryAgents });
    
  } catch (error) {
    console.log("The error is", error);
    return res.status(500).json({ message: "Failed to fetch delivery agents", error: error.message });
  }
});


// Controller function to assign a delivery agent to an order
router.post('/assignDeliveryAgent',async (req, res) => {
  console.log("It is hitting the api");
  
  try {
    console.log("It is in te try block");
    
    const { orderId, deliveryAgentId } = req.body;
    console.log("Order id is",orderId);
    
    // Validate inputs
    if (!orderId || !deliveryAgentId) {
      return res.status(400).json({ 
        success: false, 
        message: "Order ID and Delivery Agent ID are required" 
      });
    }

    // Check if the order exists
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Check if the delivery agent exists
    const deliveryAgent = await deliveryModel.findById(deliveryAgentId);
    if (!deliveryAgent) {
      return res.status(404).json({ 
        success: false, 
        message: "Delivery agent not found" 
      });
    }

    
    // Check if the delivery agent is available
    if (deliveryAgent.status !== "available") {
      return res.status(400).json({ 
        success: false, 
        message: "This delivery agent is not available at the moment" 
      });
    }

    // Update the order with the delivery agent reference
    order.deliveryAgent = deliveryAgentId;
    order.status = "Shipped"; // Optionally update the order status
    await order.save();

    // Update the delivery agent's status and assigned orders
    deliveryAgent.status = "occupied";
    deliveryAgent.assignedOrders.push(orderId);
    await deliveryAgent.save();

    return res.status(200).json({
      success: true,
      message: "Delivery agent assigned successfully",
      data: {
        order: order._id,
        deliveryAgent: deliveryAgent.name,
        status: order.status
      }
    });

  } catch (error) {
    console.error("Error assigning delivery agent:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while assigning delivery agent",
      error: error.message
    });
  }
});
// router.get('/chatSeller',isLoggedInOwner,async(req,res)=>{
//   let ownerId=await ownerModel.findOne({_id:req.owner._id});
//   let ownerid=ownerId._id;
//   console.log(`Owner id is ${ownerid}`);
//   res.render('chatSeller',{ownerid});
// })
// router.get('/chatBuyer/:productId',isLoggedIn,async(req,res)=>{
//  let product=await productModel.findOne({_id:req.params.productId});
// //  console.log(`product  is ${product.owner}`);
// productid=product._id;
//  let ownerid=product.owner;
//  let userId=await userModel.findOne({_id:req.user._id});
//  let userid=userId._id;
//  res.render('chatBuyer',{userid,productid,ownerid});
// //  console.log(`Usser id is ${userid}`);

// })
module.exports = router;




