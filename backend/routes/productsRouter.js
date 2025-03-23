const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Token is missing" });
          }
        
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token
            let owner = await ownerModel.findOne({ _id: decoded.id }).select("-password");

        let { name, price,units, discount, ShopName, Address, description } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            units,
            discount,
            ShopName,
            Address,
            description,
            owner: owner._id
        })
        console.log(product);
        await ownerModel.findByIdAndUpdate(owner._id,{
            $push:{products:product._id}
        })
        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (err) {
        console.log(err);
        return res.json({ success: false,message:"Error" });
    }

})
module.exports = router;