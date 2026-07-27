const User = require("../models/user.model");

const findByEmail = async (email) => {
    return User.findOne({ email });
};

const createUser = async (userData) => {
    return User.create(userData);
};

const getUsers = async ({ filter, skip, limit }) => {
    const users = await User.find(filter)
        .select("name gender stateId email picture")
        .populate("stateId", "name")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    return {
        users,
        total,
    };
};

module.exports = {
    findByEmail,
    createUser,
    getUsers,
};