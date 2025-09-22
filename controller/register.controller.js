const Student = require("../models/student");
const bcrypt = require("bcrypt");

const studRegister = async (req, res) => {
  const { name, branch, rollNo, year, email, password } = req.body;

  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.json({
        message: "Student already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = await Student.create({
      name,
      branch,
      rollNo,
      year,
      email,
      password: hashedPassword, // ⚠️ Hash password before saving in production
    });

    res.status(201).json({
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { studRegister };
