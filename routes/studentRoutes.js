
const express= require("express");
const { getStudents, createStudent, createManyStudents, getStudentByName } = require("../controller/studentController");

const stuRouter=express.Router();

stuRouter.get("/student",getStudents);
stuRouter.post("/student",createStudent)
stuRouter.post("/manyStudents",createManyStudents);
stuRouter.get("/student/:name",getStudentByName)

module.exports={stuRouter}