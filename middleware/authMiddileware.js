const Student = require("../models/student");
const jwt = require("jsonwebtoken");

// const authMiddleware = async (req, res,next) => {
//   const studCookie = req.cookies.student;
//   console.log("studCookie",studCookie);

//   if (studCookie) {
//     const stud = await Student.findOne({
//       email: studCookie.email,
//       password: studCookie.password,
//     });
//     if (stud) {
//       req.student = stud;
//       next();
//     } else {
//       res.json({
//         message: "Please login",
//       });
//     }
//   } else {
//     res.json({
//       message: "Cokkie not found",
//     });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const authToken = req.headers["authorization"];
  const token = authToken.split(" ")[1];
  console.log(token);
  try {
    const stud = jwt.verify(token, process.env.SECRET_KEY);
    req.student = stud;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authMiddleware };
