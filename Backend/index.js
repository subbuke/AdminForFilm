const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Usermodel = require("./UserModel"); // your Mongoose model
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET all cards
app.get("/data", async (req, res) => {
  try {
    const data = await Usermodel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE card by ID
app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Usermodel.findByIdAndDelete(id);
    if (!deletedCard) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted successfully", card: deletedCard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});