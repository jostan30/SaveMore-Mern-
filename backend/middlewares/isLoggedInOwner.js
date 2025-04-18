const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

module.exports = async function (req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from 'Authorization' header
  if (!token) {
    return res.status(401).json({ success: false, message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token
    let owner = await ownerModel.findOne({ _id: decoded.id }).select("-password");

    if (!owner) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

     // Store the owner object in the request
    return res.status(200).json({ success: true, owner:owner});
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to authenticate token" });
  }
};
