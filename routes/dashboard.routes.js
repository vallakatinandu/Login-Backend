const express= require("express");
const { authMiddleware } = require("../middleware/authMiddileware");
const { dashBoard } = require("../controller/dashboard.controller");

const dashBoardRouter= express.Router();

dashBoardRouter.get("/",authMiddleware,dashBoard);

module.exports={dashBoardRouter}