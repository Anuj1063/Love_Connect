const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true ,versionKey:false}
);


swipeSchema.index({ userId: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model("Swipe", swipeSchema);
