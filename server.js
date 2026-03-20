const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Fertilizer = require("./models/fertilizer");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
res.send("AgroNest Backend Running 🌱");
});

app.post("/add-fertilizer", async (req,res)=>{
const newFertilizer = new Fertilizer(req.body);
await newFertilizer.save();
res.send("Fertilizer Added 🌱");
});

app.get("/fertilizers", async (req,res)=>{
const fertilizers = await Fertilizer.find();
res.json(fertilizers);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});