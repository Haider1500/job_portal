const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain atleast 3 characters"],
    maxLength: [30, "Name must not exceed 30s characters"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain atleast 8 characters"],
    // maxLength: [32, "Password must not exceed 32 characters"],
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid Email"],
  },
  address: {
    type: String,
    required: true,
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
