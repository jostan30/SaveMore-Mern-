const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const productModel=require('../models/product-model');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');

router.get('/',(req,res)=>{
    res.send("Hey it is working");
})
router.post('/create',isLoggedInOwner,upload.single('image'),async(req,res)=>{
        try{
            const ownerId=req.owner._id;
            let{name,price,discount,ShopName,Address,description}=req.body;
            let product=await productModel.create({
               image:req.file.buffer,
               name,
               price,
               discount,
               ShopName,
               Address,
               description,
               owner:ownerId
            })
            req.flash("success","Products created successfully");
            res.redirect("/owners/dashboard");
            // res.redirect('/shop');
        }catch(err){
            res.send(err);
        }
         
})
module.exports=router;