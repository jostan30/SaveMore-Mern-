const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.json({ success: false, message: "Token is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Find the user using the decoded ID (ensure you use the correct field from your token payload)
    const user = await userModel.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
     console.log("THE USER IS",user);
     
    // Pass control to the next middleware/route
    return res.json({ success: true, message: "token found",user });
  
  } catch (err) {
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};
