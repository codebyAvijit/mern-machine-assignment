const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const stateRoutes = require("./routes/state.routes");

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});

app.use("/api/states", stateRoutes);

module.exports = app;