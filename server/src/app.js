const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const stateRoutes = require("./routes/state.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

// Body parser
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});

// API routes
app.use("/api/states", stateRoutes);
app.use("/api/users", userRoutes);

module.exports = app;