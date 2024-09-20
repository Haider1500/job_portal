const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/error");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.query, "===========query");
    const { email, password } = req.query;
    if (!email && !password) {
      return next(new ErrorHandler("all fields are required", 400));
    }
    // check if user exists in the db
    const isUser = await User.findOne({ email });
    console.log(isUser, "=============user");
    if (!isUser && !isUser.email && !isUser.password) {
      return next(ErrorHandler("User doesnot exists", 400));
    }

    // comparng the entred and stored paswords
    const passwordMatch = await bcrypt.compare(password, isUser.password);
    if (!passwordMatch) {
      return next(new ErrorHandler("invalid credentials", 401));
    }
    // create a web token if it exists
    const token = jwt.sign({ isUser }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      token: token,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = { login };
