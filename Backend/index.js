 const express = require("express");
 const app = express();
 const mongoose = require("mongoose");
const cors = require("cors")
const Usermodel = require("./UserModel");

app.use(cors());
app.use(express.json())
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("backend is running")
})

app.get("/data", (req, res) => {
  Usermodel.find()
  .then(data => res.json(data))
  .catch(err => res.json(err))
})


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("database connected"))
.catch(err => console.log(err))

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server is running")
})
