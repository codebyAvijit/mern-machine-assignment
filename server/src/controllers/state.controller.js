const { getAllStates, getCitiesByState } = require("../services/state.service");

const ApiResponse = require("../utils/response/ApiResponse");

const handleGetAllStates = async (req, res, next) => {
  try {
    const states = await getAllStates();

    return ApiResponse.success(res, "States fetched successfully", states);
  } catch (error) {
    next(error);
  }
};

const handleGetAllCities = async (req, res, next) => {
  try {
    const { stateId } = req.params;

    const cities = await getCitiesByState(stateId);

    return ApiResponse.success(res, "Cities fetched successfully", cities);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllStates,
  handleGetAllCities,
};
