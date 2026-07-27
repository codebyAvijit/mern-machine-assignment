const User = require("../models/user.model");

const findByEmail = async (email) => {
    return User.findOne({ email });
};

const createUser = async (userData) => {
    return User.create(userData);
};

module.exports = {
    findByEmail,
    createUser,
};