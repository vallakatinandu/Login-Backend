const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const studLogin = async (req, res) => {
//   const { email, password } = req.body;

//   const stud = await Student.findOne({ email });
//   if (stud) {
//     const isPasswordMatch = await bcrypt.compare(password, stud.password);
//     if (isPasswordMatch) {
//       res.cookie("student", stud, {
//         httpOnly: true,
//         secure: false,
//         maxAge: 2 * 24 * 60 * 60 * 1000,
//       });
//       res.json({
//         message: "Student login Successfully",
//         data: stud,
//       });
//     } else {
//       res.json({
//         message: " Something went wrong",
//       });
//     }
//   }
// };

const studLogin = async (req, res) => {
  const { email, password } = req.body;

  const stud = await Student.findOne({ email });
  if (stud) {
    const isPasswordMatch = await bcrypt.compare(password, stud.password);
    if(!isPasswordMatch){
        res.json({
            message:"Wrong credentials"
        })
    }
    if (isPasswordMatch) {
      const token = jwt.sign({ data: stud }, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });
      if (token) {
        res.json({
          message: "Student Login successfully",
          data:stud,
          token: token
        });
      }
    }
  } else {
   await res.json({ message: "Internal server error" });
  }
};

module.exports = { studLogin };
