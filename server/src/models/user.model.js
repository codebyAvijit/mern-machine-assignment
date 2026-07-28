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

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
  },
);

// Indexes
userSchema.index(
  { email: 1 },
  {
    unique: true,
    sparse: true,
  },
);

userSchema.index({ stateId: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
