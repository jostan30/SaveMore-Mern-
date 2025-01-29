const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

module.exports = async function (req, res) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from 'Authorization' header

  if (!token) {
    return res.json({ sucess: false , message: "Token is missing"} );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token
    let owner = await ownerModel.findOne({ _id: decoded.id }).select("-password");

      if(!owner) {
        return res.json({ sucess: true ,message:"User not found" });
      }
      return res.json({ sucess:true , message:"Token found" });
  } catch (err) {
    return res.json({ sucess: false });
  }
};
