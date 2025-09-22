const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  branch: {
    type: String,
    require: true,
  },
  rollNo: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  email:{
    type:String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  otp:{
    type: String,
  },
  otpExpiry:{
    type: Date,
  }
});
const Student=mongoose.model("Students", studentsSchema);
module.exports = Student
