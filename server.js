const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("AgroNest Backend Running 🌱");
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