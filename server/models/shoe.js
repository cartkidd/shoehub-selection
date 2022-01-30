const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  name: String,
  model: Number,
  company: String,
  ownerId: String
});

module.exports = mongoose.model("Shoes", ShoeSchema);