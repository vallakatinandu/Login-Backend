const dashBoard = async (req, res) => {
  console.log(req.student);
  const studData = req.student;
  if (studData) {
    res.json({
      message: "welcome to dashboard",
      data: studData,
    });
  } else {
    res.json({
      message: "please login first before visting the dashboard",
    });
  }
};

module.exports={dashBoard}