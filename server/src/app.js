const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const stateRoutes = require("./routes/state.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Security headers
// Allow uploaded images to be displayed by the Vercel frontend
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-machine-assignment.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse JSON requests
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Routes
app.use("/api/states", stateRoutes);
app.use("/api/users", userRoutes);

const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/error.middleware");

module.exports = app;
