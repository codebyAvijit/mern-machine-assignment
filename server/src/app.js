const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const stateRoutes = require("./routes/state.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(helmet());

const allowedOrigins = [
    "http://localhost:5173",
    "https://mern-machine-assignment.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});

app.use("/api/states", stateRoutes);
app.use("/api/users", userRoutes);

module.exports = app;