require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the AI-Powered Job Portal Backend");
});
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
