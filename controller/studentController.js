const Student = require("../models/student");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.json({
      message: " Students not fetched ",
      data: {},
    });
  }
};

const createStudent = async (req, res) => {
  const { name, branch, rollNo, year, email, password } = req.body;
  try {
    const studentData = await Student.create({
      name: name,
      branch: branch,
      rollNo: rollNo,
      year: year,
      email: email,
      password: password,
    });
    res.json({
      message: "Student created successfully",
      data: studentData,
    });
  } catch (error) {
    res.json({
      message: ("Error to create the student", error),
      data: [],
    });
  }
};

const createManyStudents = async (req, res) => {
  const data = req.body;
  try {
    const studentData = await Student.insertMany(data);
    res.json({
      message: "Students created successfully",
      data: studentData,
    });
  } catch (error) {
    res.json({
      message: ("Error to create the student", error),
      data: [],
    });
  }
};

const getStudentByName= async (req,res)=>{
    const {name}= req.params;
    try {
        const studentData= await Student.findOne({name:name});
        res.json({
            message:"Student fetched successfully",
            data: studentData
        })
    } catch (error) {
        res.json({
            message: "Error fetching for student",
            error:error.message
        })
    }
}

module.exports = { getStudents, createStudent, createManyStudents ,getStudentByName};
