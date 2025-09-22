const express= require("express");
const { studLogin } = require("../controller/login.controller");

const loginRouter= express.Router();

loginRouter.post("/login",studLogin);

module.exports= {loginRouter}