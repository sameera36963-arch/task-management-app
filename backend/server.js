require("dotenv").config();
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("All env keys:", Object.keys(process.env).filter(key => key.includes("MONGO")));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("Task Management API Running");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});