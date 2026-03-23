const express = require("express");
const cors = require("cors");
const Farmer = require("./models/Farmer");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("AgroNest Backend Running 🌱");
});
app.post("/api/farmer", async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.json({ message: "Farmer saved successfully 🌾" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving farmer" });
  }
});

// Get Farmers
app.get("/api/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.json(farmers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching farmers" });
  }
});
app.get("/api/message", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to AgroNest backend"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});