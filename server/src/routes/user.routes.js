const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");

const { userController } = require("../container/container");

const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validation.middleware");
const { registerUserSchema } = require("../validators/user.validator");

router.get("/", authenticate, userController.handleGetUsers);

router.post(
  "/",
  upload.single("picture"),
  validate(registerUserSchema),
  userController.handleCreateUser,
);

module.exports = router;
