const ApiResponse = require("../utils/response/ApiResponse");
const userResponse = require("../utils/response/userResponse");

module.exports = ({ userService }) => {
  const handleCreateUser = async (req, res, next) => {
    try {
      const userData = {
        ...req.body,
        picture: req.file ? req.file.filename : null,
      };

      const user = await userService.createUser(userData);

      return ApiResponse.created(
        res,
        "User registered successfully",
        userResponse(user),
      );
    } catch (error) {
      next(error);
    }
  };

  const handleGetUsers = async (req, res, next) => {
    try {
      const result = await userService.getUsers(req.query);

      return ApiResponse.success(res, "Users fetched successfully", {
        users: result.users.map(userResponse),
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    handleCreateUser,
    handleGetUsers,
  };
};
