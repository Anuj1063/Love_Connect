const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    
  isPremium:{type:Boolean,default:false},
   role: { type: String, required: true, enum: ["user", "admin"],default:"user" },
  reports: [
    {
      reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reason: String,
      createdAt: { type: Date, default: Date.now },
      
    },
  ],
  
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);


module.exports = mongoose.model("User", userSchema);