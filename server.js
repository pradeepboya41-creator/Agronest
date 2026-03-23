require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Farmer = require("./models/Farmer");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("AgroNest Backend Running 🌱");
});

// ✅ Test API
app.get("/api/message", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to AgroNest backend"
  });
});

// ✅ Add Farmer (POST)
app.post("/api/farmer", async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.json({ message: "Farmer saved successfully 🌾" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving farmer" });
  }
});

// ✅ Get Farmers (GET)
app.get("/api/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.json(farmers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching farmers" });
  }
});
app.get("/api/farmers", async (req, res) => {
  // existing code
});
app.delete("/api/farmer/:id", async (req, res) => {
  try {
    await Farmer.findByIdAndDelete(req.params.id);
    res.json({ message: "Farmer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting farmer" });
  }
});
// ✅ Start server + connect MongoDB
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
});