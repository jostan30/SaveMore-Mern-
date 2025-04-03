const express = require('express');
const router = express.Router();
const { loginOwner, registerOwner } = require('../controllers/authController');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const ownerModel=require('../models/owner-model')

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

module.exports = router;