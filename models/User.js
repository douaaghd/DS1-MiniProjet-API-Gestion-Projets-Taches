const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: String,
  login: String,
  password: String,
  role: { type: String, enum: ["user", "manager"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
