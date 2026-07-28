const express = require("express");

const { authController } = require("../container/container");
const validate = require("../middleware/validation.middleware");
const { loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", validate(loginSchema), authController.handleLogin);

module.exports = router;
