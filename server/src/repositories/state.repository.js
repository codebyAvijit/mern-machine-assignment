const State = require("../models/state.model");

const getAllStates = async () => {
    return State.find().select("name");
};

const getStateById = async (stateId) => {
    return State.findById(stateId).select("cities");
};

module.exports = {
    getAllStates,
    getStateById,
};