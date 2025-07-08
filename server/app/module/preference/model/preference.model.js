
const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // ensures one preferences doc per user
    },
    gender: {
      type: String,
      enum: ["male", "female", "all"],
      default: "all"
    },
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 99 }
    },
    distance: {
      type: Number,
      default: 50 
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Preference", preferenceSchema);
