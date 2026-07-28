const express = require("express");

const { handleLogin } = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const { loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", validate(loginSchema), handleLogin);

module.exports = router;
