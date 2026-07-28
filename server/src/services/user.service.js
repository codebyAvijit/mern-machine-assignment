const bcrypt = require("bcryptjs");

const AppError = require("../utils/errors/AppError");

module.exports = ({ userRepository, stateRepository }) => {
  const createUser = async (userData) => {
    if (userData.email) {
      const existingUser = await userRepository.findByEmail(userData.email);

      if (existingUser) {
        throw new AppError("User with this email already exists", 409);
      }
    }

    const state = await stateRepository.getStateById(userData.stateId);

    if (!state) {
      throw new AppError("Invalid state", 400);
    }

    if (userData.city && !state.cities.includes(userData.city)) {
      throw new AppError(
        "Selected city does not belong to the selected state",
        400,
      );
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    return userRepository.createUser(userData);
  };

  const getUsers = async (query) => {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

    const skip = (page - 1) * limit;

    const filter = {};

    if (query.name) {
      filter.name = {
        $regex: query.name,
        $options: "i",
      };
    }

    if (query.gender) {
      filter.gender = query.gender;
    }

    if (query.stateId) {
      filter.stateId = query.stateId;
    }

    const { users, total } = await userRepository.getUsers({
      filter,
      skip,
      limit,
    });

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

  return {
    createUser,
    getUsers,
  };
};
