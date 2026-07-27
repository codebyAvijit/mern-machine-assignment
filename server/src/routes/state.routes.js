const express = require("express");
const router = express.Router();

const {
    handleGetAllStates,
    handleGetAllCities,
} = require("../controllers/state.controller");

router.get("/", handleGetAllStates);

router.get("/:stateId/cities", handleGetAllCities);

module.exports = router;