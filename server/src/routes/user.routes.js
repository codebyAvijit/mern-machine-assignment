const express = require("express");
const router = express.Router();

const {
    handleCreateUser,
} = require("../controllers/user.controller");

const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validation.middleware");
const { registerUserSchema } = require("../validators/user.validator");

router.post(
    "/",
    upload.single("picture"),
    validate(registerUserSchema),
    handleCreateUser
);

module.exports = router;