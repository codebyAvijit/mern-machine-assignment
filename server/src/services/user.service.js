const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/user.repository");
const stateRepository = require("../repositories/state.repository");

const createUser = async (userData) => {
  if (userData.email) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  const state = await stateRepository.getStateById(userData.stateId);

  if (!state) {
    const error = new Error("Invalid state");
    error.statusCode = 400;
    throw error;
  }

  if (userData.city && !state.cities.includes(userData.city)) {
    const error = new Error(
      "Selected city does not belong to the selected state",
    );
    error.statusCode = 400;
    throw error;
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

module.exports = {
  createUser,
  getUsers,
};
