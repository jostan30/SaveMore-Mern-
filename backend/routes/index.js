const express=require('express');
const router=express.Router();
 const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel=require('../models/user-model');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const ownerModel = require('../models/owner-model');
router.get('/',(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
   
});
router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find();
    let success=req.flash('success');

    res.render("shop",{products,success});
});
router.get('/cart',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('cart');
  // let bill= (Number(user.cart[0].price)+20)-Number(user.cart[0].discount)
    //  console.log(users.cart)
    let success=req.flash('success');
      res.render('cart',{user,success});
})

router.get('/addtocart/:productid',isLoggedIn,async (req,res)=>{
      console.log(req.user);
    let user=await userModel.findOne({email: req.user.email}).populate('cart');
    user.cart.push(req.params.productid);
    console.log('Product ID:', req.params.productid); 
    await user.save();
    req.flash('success','Added to cart');
    res.redirect('/shop');
})
// router.post('/cart/delete/:cartid',isLoggedIn,async(req,res)=>{
//    const {itemId}=req.params;
//    let user=await userModel.findOne({email:req.user.email});
//    user.cart.pull(itemId);
//    await user.save();
router.get('/details/:productId',isLoggedIn,async(req,res)=>{
  // console.log(req.user);
// let user=await userModel.findOne({email:req.user.email}).populate('cart');
let product=await productModel.findOne({_id:req.params.productId});

  res.render('details',{product});
})

// })
// router.get('/delete/:itemId',isLoggedIn,async(req,res)=>{
//   let product=await productModel.findOneAndDelete({_id:req.params.itemId});
// res.redirect('/cart');
// })
router.get('/delete/:itemId',isLoggedIn,async(req,res)=>{
  let user = await userModel.findOne({ email: req.user.email });
  user.cart = user.cart.filter(item => item.toString() !== req.params.itemId);

  // Save the updated user document
  await user.save();
  
  req.flash('success','Item removed from cart successfully');
  res.redirect('/cart');

})

router.get('/chatSeller',isLoggedInOwner,async(req,res)=>{
    let ownerId=await ownerModel.findOne({_id:req.owner._id});
    let ownerid=ownerId._id;
    console.log(`Owner id is ${ownerid}`);
    res.render('chatSeller',{ownerid});
})
router.get('/chatBuyer/:productId',isLoggedIn,async(req,res)=>{
   let product=await productModel.findOne({_id:req.params.productId});
  //  console.log(`product  is ${product.owner}`);
  productid=product._id;
   let ownerid=product.owner;
   let userId=await userModel.findOne({_id:req.user._id});
   let userid=userId._id;
   res.render('chatBuyer',{userid,productid,ownerid});
  //  console.log(`Usser id is ${userid}`);
 
})
module.exports=router;