require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Fertilizer = require("./models/fertilizer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("AgroNest Backend Running 🌱");
});

app.post("/add-fertilizer", async (req, res) => {
  try {
    const newFertilizer = new Fertilizer(req.body);
    await newFertilizer.save();
    res.send("Fertilizer Added 🌱");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding fertilizer");
  }
});

app.get("/fertilizers", async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find();
    res.json(fertilizers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});