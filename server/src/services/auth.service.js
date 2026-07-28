const bcrypt = require("bcryptjs");

const AppError = require("../utils/errors/AppError");
const userResponse = require("../utils/response/userResponse");

module.exports = ({ authRepository, jwtService }) => {
  const login = async ({ email, password }) => {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = jwtService.generateAccessToken({
      id: user._id,
      role: user.role,
    });

    return {
      user: userResponse(user),
      accessToken,
    };
  };

  return {
    login,
  };
};
