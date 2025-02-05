const express=require('express');
const router=express.Router();
 const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel=require('../models/user-model');
const jwt = require('jsonwebtoken');

//all products
router.get('/shop',async(req,res)=>{
  try {
    let products=await productModel.find();
    if(!products) {
      return res.json({success:false ,message:"No Products yet"})
    }
     // Convert Buffer image to Base64 string
     const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      image: product.image.toString("base64"), // Convert Buffer to Base64
    }));
    return res.json(formattedProducts);
  } catch (error) {
    console.log(error);
    return res.json({success:false ,message:"Server error"});
  }
});

router.get('/cart',async(req,res)=>{
  try {
    
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
    
    if (!token) {
      return res.json({  message: "Token is missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user=await userModel.findOne({_id:decoded.id}).populate('cart');
    const formattedProducts = user.cart.map((product) => ({
      ...product.toObject(),
      image: product.image.toString("base64"), // Convert Buffer to Base64
    }));
    return res.json(formattedProducts);

  } catch (error) {
    return res.json(error);
  } 

})

router.post('/addtocart', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
    
      if (!token) {
          return res.status(401).json({ message: "Token is missing" });
      }
      const {product_id , quanitity} =req.body;

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      let user = await userModel.findById(decoded.id).populate('cart');

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      user.cart.push(product_id);
      await user.save();

      res.status(200).json({ message: "Added to cart successfully!" });
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// router.post('/cart/delete/:cartid',isLoggedIn,async(req,res)=>{
//    const {itemId}=req.params;
//    let user=await userModel.findOne({email:req.user.email});
//    user.cart.pull(itemId);
//    await user.save();

// router.get('/details/:productId',isLoggedIn,async(req,res)=>{
//   // console.log(req.user);
// // let user=await userModel.findOne({email:req.user.email}).populate('cart');
// let product=await productModel.findOne({_id:req.params.productId});

//   res.render('details',{product});
// })

// })
// router.get('/delete/:itemId',isLoggedIn,async(req,res)=>{
//   let product=await productModel.findOneAndDelete({_id:req.params.itemId});
// res.redirect('/cart');
// })
router.get('/delete/:itemId', async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header  
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findOne({ _id: decoded.id });

    // Find the index of the first occurrence of the item with matching product ID
    const itemIndex = user.cart.findIndex(item => item.toString() === req.params.itemId);

    if (itemIndex !== -1) {
      // Remove only the first matching item from the cart
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


// router.get('/chatSeller',isLoggedInOwner,async(req,res)=>{
//     let ownerId=await ownerModel.findOne({_id:req.owner._id});
//     let ownerid=ownerId._id;
//     console.log(`Owner id is ${ownerid}`);
//     res.render('chatSeller',{ownerid});
// })
// router.get('/chatBuyer/:productId',isLoggedIn,async(req,res)=>{
//    let product=await productModel.findOne({_id:req.params.productId});
//   //  console.log(`product  is ${product.owner}`);
//   productid=product._id;
//    let ownerid=product.owner;
//    let userId=await userModel.findOne({_id:req.user._id});
//    let userid=userId._id;
//    res.render('chatBuyer',{userid,productid,ownerid});
//   //  console.log(`Usser id is ${userid}`);
 
// })
module.exports=router;