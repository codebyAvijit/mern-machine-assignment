const stateRepository = require("../repositories/state.repository");

const getAllStates = async () => {
    return stateRepository.getAllStates();
};

const getCitiesByState = async (stateId) => {
    const state = await stateRepository.getStateById(stateId);

    if (!state) {
        const error = new Error("State not found");
        error.statusCode = 404;
        throw error;
    }

    return state.cities;
};

module.exports = {
    getAllStates,
    getCitiesByState,
};