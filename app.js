const express = require("express");
const DBconnection = require("./config/db");
const cookieParser=require("cookie-parser")
const dotenv = require("dotenv");
const cors=require("cors")
const { stuRouter } = require("./routes/studentRoutes");
const { registerRouter } = require("./routes/register.routes");
const { loginRouter } = require("./routes/login.routes");
const { logoutRouter } = require("./routes/logout.routes");
const { dashBoardRouter } = require("./routes/dashboard.routes");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/users", stuRouter);
app.use("/student",registerRouter);
app.use("/student",loginRouter);
app.use("/student",logoutRouter);
app.use("/dashboard",dashBoardRouter)

DBconnection();

app.listen(3000, (error) => {
  if (error) {
    console.log("Error in running the server");
  } else {
    console.log("Your server is running on https://localhost:3000");
  }
});
