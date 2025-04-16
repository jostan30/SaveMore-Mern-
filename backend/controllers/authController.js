const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const userModel = require('../models/user-model');
const ownerModel = require('../models/owner-model');



//User Signup
module.exports.registerUser = async (req, res) => {
   try {
      let { fullname, email, password } = req.body;
      let user = await userModel.findOne({ email });
      if (user) return  res.json({success:false, msg: "User already exists" });

      bcrypt.genSalt(10, function (err, salt) {
         bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
               fullname,
               email,
               password: hash
            });
            let token = generateToken(user);
            console.log("The user is craeted and token is",token);
            
         //    res.cookie("token", token, {
         //       httpOnly: true,
         //       secure: false,      // Set this to true if using https
         //       sameSite: 'None'    // This allows the cookie to be sent cross-origin
         //   });

         res.cookie("token", token, {
            httpOnly: true,              // Makes the cookie inaccessible to JavaScript
            secure: true,                // Cookie only sent over HTTPS (in production)
            sameSite: 'None',            // Necessary for cross-origin cookies
            domain: '.save-more-mern.vercel.app', // Domain for which the cookie is valid
            path: '/',                   // Path for the cookie (root path in this case)
            maxAge: 3600000              // Cookie expiration time (1 hour in milliseconds)
        });
            return res.json({success:true, msg: "User Created successfully!!" });
         });
      });
   } catch (err) {
      return res.json({success:false, msg: "Server side error" });
   }
}

//Owner Signup
module.exports.registerOwner = async (req, res) => {
   try {
      let { fullname, email, password } = req.body;
      let owner = await ownerModel.findOne({ email });
      if (owner) return  res.json({success:false, msg: "User already exists" });

      bcrypt.genSalt(10, function (err, salt) {
         bcrypt.hash(password, salt, async function (err, hash) {
            let user = await ownerModel.create({
               fullname,
               email,
               password: hash
            });
            let token = generateToken(user);
            res.cookie("token", token, {
               httpOnly: true,
               secure: false,      // Set this to true if using https
               sameSite: 'None'    // This allows the cookie to be sent cross-origin
           });
            return res.json({success:true, msg: "User Created successfully!!" });
         });
      });
   } catch (err) {
      return res.json({success:false, msg: "Server side error" });
   }
}

//User Login
module.exports.loginUser = async (req, res) => {
   let { email, password } = req.body;
   let user = await userModel.findOne({ email: email });
   if (!user) {
      console.log("User acnnot be recognized");
      
      return res.json({ success:false, msg: "User doesnt exist" });
      
   }
   bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
         let token = generateToken(user);
         console.log("The users token is",token);
         
         res.cookie("token", token);
         return res.json({success:true, msg: "You have registered successfully" });

      } else {
         return res.json({success:false, msg: "Invalid Credentials" });
      }

   })
}

//Owner Login
module.exports.loginOwner=  async (req, res) => {
   let { email, password } = req.body;
   let owner = await ownerModel.findOne({ email: email });
   if (!owner) {
      return res.json({success:false, msg: "User doesnt exist" });
   }
   bcrypt.compare(password, owner.password, function (err, result) {
      if (result) {
         let token = generateToken(owner);
         res.cookie("token", token);
         return res.json({ success:true, msg: "You have registered successfully" });

      } else {
         return res.json({success:false, msg: "Invalid Credentials" });
      }

   })
}