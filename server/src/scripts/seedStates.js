const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const State = require("../models/state.model");

dotenv.config();

const states = [
    {
        name: "Delhi",
        cities: ["Delhi", "New Delhi"],
    },
    {
        name: "Uttar Pradesh",
        cities: ["Noida", "Lucknow"],
    },
];

const seedStates = async () => {
    try {
        await connectDB();

        await State.deleteMany({});
        await State.insertMany(states);

        console.log("States seeded successfully");
    } catch (error) {
        console.error("State seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

seedStates();