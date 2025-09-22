const express= require("express");
const { studRegister } = require("../controller/register.controller");

const registerRouter= express.Router();

registerRouter.post("/register",studRegister)

module.exports= {registerRouter}