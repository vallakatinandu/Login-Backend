const express = require("express");
const DBconnection = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { stuRouter } = require("./routes/studentRoutes");
const { registerRouter } = require("./routes/register.routes");
const { loginRouter } = require("./routes/login.routes");
const { logoutRouter } = require("./routes/logout.routes");
const { dashBoardRouter } = require("./routes/dashboard.routes");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5176",
  "https://login-orpin-three.vercel.app", // Add your deployed frontend URL here
  "https://login-backend-fjbu.onrender.com", // If needed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies
  })
);

app.use("/users", stuRouter);
app.use("/student", registerRouter);
app.use("/student", loginRouter);
app.use("/student", logoutRouter);
app.use("/dashboard", dashBoardRouter);

DBconnection();

const PORT = process.env.PORT || 3000; // use environment port or fallback to 3000

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error in running the server:", error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
