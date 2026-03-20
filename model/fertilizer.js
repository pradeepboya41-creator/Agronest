const mongoose = require("mongoose");

const fertilizerSchema = new mongoose.Schema({
  crop: String,
  fertilizer: String,
  description: String
});

module.exports = mongoose.model("Fertilizer", fertilizerSchema);