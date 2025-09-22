const studLogout = async (req, res) => {
  res.clearCookie("student");
  res.json({
    message: "Logout successfully",
  });
};
module.exports = { studLogout };
