const authRepository = require("../repositories/auth.repository");
const AppError = require("../utils/errors/AppError");
const { verifyAccessToken } = require("../utils/jwt/jwt");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Access token is required", 401);
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await authRepository.findById(payload.id);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
