const express = require('express');
require("dotenv").config();
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");
const GEMINI_KEY=process.env.YOUR_GEMINI_KEY;
console.log("The gemini key is",GEMINI_KEY);

// router.post('/create', upload.single('image'), async (req, res) => {
//     try {
//         const token = req.headers["authorization"]?.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ success: false, message: "Token is missing" });
//           }
        
//         const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token
//             let owner = await ownerModel.findOne({ _id: decoded.id }).select("-password");

//         let { name, price,units, discount, ShopName, Address, description } = req.body;
//         let product = await productModel.create({
//             image: req.file.buffer,
//             name,
//             price,
//             units,
//             discount,
//             ShopName,
//             Address,
//             description,
//             owner: owner._id
//         })
//         console.log(product);
//         await ownerModel.findByIdAndUpdate(owner._id,{
//             $push:{products:product._id}
//         })
//         res.status(201).json({ success: true, message: "Product created successfully", product });
//     } catch (error) {
//         console.log(error);
//         return res.json({ success: false,message:"Error" });
//     }

// })
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Token is missing" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token
        let owner = await ownerModel.findOne({ _id: decoded.id }).select("-password");

        let { name, price, units, discount, ShopName, Address, description, expiryDate, daysRemaining } = req.body;
        
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            units,
            discount,
            ShopName,
            Address,
            description,
            owner: owner._id,
            expiryDate: expiryDate || null,
            daysRemaining: daysRemaining || null
        });
        
        console.log(product);
        await ownerModel.findByIdAndUpdate(owner._id, {
            $push: { products: product._id }
        });
        
        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
});
router.post("/extract-expiry",async(req,res)=>{
    // const {ocrText}=req.body;
    // console.log("The text is",ocrText);
    const {expiryImage}=req.body;
    console.log("The base64  image in string is",expiryImage);
    console.log("Received extract-expiry request with size:", JSON.stringify(req.body).length);
    try {

        const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_KEY} `,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                contents:[{
                    parts:[
                        {text:"Extract the expiry date from the image and can you just return th date in a format such that i can display it as input filed in react"},
                        {
                            "inlineData":{
                                "mimeType":"image/png",
                                "data":expiryImage
                            }
                        }
                    ]
                }]
            })
        });
        const data=await response.json();
        console.log("The response from gemini is",data);
                // Extracting the content from the response
                const candidateContent = data.candidates && data.candidates[0] && data.candidates[0].content;
                let extractedExpiryDate = "";
        
                if (candidateContent) {
                    // Extract the text from the parts field within the content
                    extractedExpiryDate = candidateContent.parts.map(part => part.text).join(' ');
                }
         console.log("The extracted date is",extractedExpiryDate);
                 
        res.json({ success: true,extractedExpiryDate});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
})
module.exports = router;