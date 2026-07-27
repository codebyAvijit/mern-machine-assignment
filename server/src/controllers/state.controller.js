const {
    getAllStates,
    getCitiesByState,
} = require("../services/state.service");

const handleGetAllStates = async (req, res, next) => {
    try {
        const states = await getAllStates();

        res.status(200).json(states);
    } catch (error) {
        next(error);
    }
};

const handleGetAllCities = async (req, res, next) => {
    try {
        const { stateId } = req.params;

        const cities = await getCitiesByState(stateId);

        res.status(200).json(cities);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleGetAllStates,
    handleGetAllCities,
};