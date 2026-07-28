const User = require("../models/user.model");

const findByEmail = (email) => {
  return User.findOne({ email });
};

const findById = (id) => {
  return User.findById(id);
};

module.exports = {
  findByEmail,
  findById,
};
