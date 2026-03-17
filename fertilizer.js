const mongoose = require("mongoose");

const FertilizerSchema = new mongoose.Schema({
  crop: String,
  fertilizer: String,
  description: String
});

module.exports = mongoose.model("Fertilizer", FertilizerSchema);