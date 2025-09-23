const express = require("express");
const {
  loginWithOtpRequest,
  verifyOtpLogin,
} = require("../controller/login.controller");

const loginRouter = express.Router();

loginRouter.post("/login", loginWithOtpRequest);
loginRouter.post("/verify-otp", verifyOtpLogin);
module.exports = { loginRouter };

