const bcrypt = require("bcryptjs");

const authRepository = require("../repositories/auth.repository");
const AppError = require("../utils/errors/AppError");
const { generateAccessToken } = require("../utils/jwt/jwt");
const userResponse = require("../utils/response/userResponse");

const login = async ({ email, password }) => {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  return {
    user: userResponse(user),
    accessToken,
  };
};

module.exports = {
  login,
};
