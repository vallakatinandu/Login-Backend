const express= require("express");
const { studLogout } = require("../controller/logout.controller");

const logoutRouter= express.Router();

logoutRouter.post("/logout",studLogout);

module.exports={logoutRouter}