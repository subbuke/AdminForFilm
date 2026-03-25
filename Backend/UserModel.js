const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})

const Usermodel = mongoose.model("flimusers", schema)

module.exports = Usermodel;