const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female"],
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: null,
        },

        mobile: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        stateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "State",
            required: true,
        },

        city: {
            type: String,
            trim: true,
        },

        hobbies: {
            type: [String],
            enum: ["Chess", "Cricket", "Football", "Hockey"],
            default: [],
        },

        picture: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;