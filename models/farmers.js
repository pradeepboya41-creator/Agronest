const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: String,
  crop: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Farmer", farmerSchema);