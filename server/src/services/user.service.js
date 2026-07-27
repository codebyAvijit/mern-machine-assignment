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
        const error = new Error("Selected city does not belong to the selected state");
        error.statusCode = 400;
        throw error;
    }

    return userRepository.createUser(userData);
};

module.exports = {
    createUser,
};