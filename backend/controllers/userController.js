const { ErrorHandler } = require("../middlewares/error");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userSchema");
const { v2: cloudinary } = require("cloudinary");

const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      phone,
      password,
      address,
      role,
      email,
      coverLetter,
      niches: { firstNiche, secondNiche, thirdNiche },
    } = req.body;
    if (!name || !phone || !password || !address || !role || !email) {
      return next(new ErrorHandler("All fields are required", 400));
    }
    if ((role === "Job Seeker" && !firstNiche) || !secondNiche || !thirdNiche) {
      return next(new ErrorHandler("Job niches are required", 400));
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(new ErrorHandler("Email already registered", 400));
    }

    const userData = {
      name,
      phone,
      password,
      address,
      role,
      email,
      coverLetter,
      niches: { firstNiche, secondNiche, thirdNiche },
    };
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          resume.tempFilePath,
          {
            folder: "Job_Portal_resume",
          }
        );

        if (!cloudinaryResponse && cloudinaryResponse.error) {
          return next(
            new ErrorHandler("Failed to upload Resume to cloud", 400)
          );
        }
        userData.resume = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      } catch (error) {
        return next(error);
      }
    }
    await User.create(userData);
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = register;
