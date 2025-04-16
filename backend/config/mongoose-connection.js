const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');
require('dotenv').config(); // Load .env variables

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    dbgr("Connected to MongoDB");           
  })
  .catch(function (err) {
    console.log("Connection error:", err);
  });

module.exports = mongoose.connection;
