const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    cities: [{
        type: String,
        required: true,
        trim: true,
    }]
});

// create model
const State = mongoose.model("State", stateSchema);

// export model
module.exports = State;