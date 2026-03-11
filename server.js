const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Fertilizer = require("./models/fertilizer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/agronest")
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


app.listen(5000, ()=>{
console.log("Server running on port 5000");
});