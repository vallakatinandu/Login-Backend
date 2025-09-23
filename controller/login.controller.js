const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// const studLogin = async (req, res) => {
// //  const { email, password } = req.body;

// //   if (stud) {
// //     const isPasswordMatch = await bcrypt.compare(password, stud.password);
// /    const stud = await Student.findOne({ email });
// //     if (isPasswordMatch) {
// //       res.cookie("student", stud, {
// //         httpOnly: true,
// //         secure: false,
// //         maxAge: 2 * 24 * 60 * 60 * 1000,
// //       });
// //       res.json({
// //         message: "Student login Successfully",
// //         data: stud,
// //       });
// //     } else {
// //       res.json({
// //         message: " Something went wrong",
// //       });
// //     }
// //   }
// // };

// 📧 Configure transporter

const transporter = nodemailer.createTransport({
  service: "gmail", // use service instead of host/port if using Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 Step 1: Login → Generate & Save OTP
const loginWithOtpRequest = async (req, res) => {
  const { email, password } = req.body;

  try {
    const stud = await Student.findOne({ email });

    if (!stud) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, stud.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP & expiry in DB
    stud.otp = otp;
    stud.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await stud.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Login",
      text: `Hello ${stud.name}, your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return res.json({ message: "OTP sent to your email. Please verify." });
  } catch (error) {
    console.error("Login with OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 Step 2: Verify OTP → Issue JWT
const verifyOtpLogin = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const stud = await Student.findOne({ email });
    if (!stud) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!stud.otp || !stud.otpExpiry) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please login again." });
    }

    if (Date.now() > stud.otpExpiry) {
      stud.otp = null;
      stud.otpExpiry = null;
      await stud.save();
      return res
        .status(400)
        .json({ message: "OTP expired. Please login again." });
    }

    if (stud.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid → clear it
    stud.otp = null;
    stud.otpExpiry = null;
    await stud.save();

    // Generate JWT
    const token = jwt.sign({ id: stud._id }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return res.json({
      message: "Login successful",
      token,
      data: stud,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginWithOtpRequest,
  verifyOtpLogin,
};
