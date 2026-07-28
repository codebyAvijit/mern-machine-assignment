const ApiResponse = require("../utils/response/ApiResponse");

module.exports = ({ authService }) => {
  const handleLogin = async (req, res, next) => {
    try {
      const result = await authService.login(req.body);

      return ApiResponse.success(res, "Login successful", result);
    } catch (error) {
      next(error);
    }
  };

  return {
    handleLogin,
  };
};
