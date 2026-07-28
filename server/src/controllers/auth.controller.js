const authService = require("../services/auth.service");
const ApiResponse = require("../utils/response/ApiResponse");

const handleLogin = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    return ApiResponse.success(res, "Login successful", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
};
