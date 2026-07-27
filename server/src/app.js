const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const stateRoutes = require("./routes/state.routes");
const userRoutes = require("./routes/user.routes");

const {
    errorHandler,
    notFoundHandler,
} = require("./middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});

app.use("/api/states", stateRoutes);
app.use("/api/users", userRoutes);

// Must remain after valid routes
app.use(notFoundHandler);

// Error middleware must be last
app.use(errorHandler);

module.exports = app;