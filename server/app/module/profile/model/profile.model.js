// const mongoose = require("mongoose");

// // Updated default profileImages to array
// const profileSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     birthday: { type: Date, required: true },
//     bio: { type: String, required: true },
//     gender: { type: String, required: true, enum: ["male", "female", "other"] },
//     interests: { type: [String], required: true },
//     age:{type:Number ,required :true},
//     profileImages: { type: [String], required: true, default: ["default.png"] },
//     blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
   
//     location: {
//       type: {
//         type: String,
//         enum: ["Point"],
//         required: true,
//       },

//       coordinates: {
//         type: [Number], // [longitude, latitude]
//         required: true,
//       },
//     },

//     // placeName: {
//     //     type: String, // Human-readable location
//     //     required: true,
//     //   },

    
  
//     isDeleted: { type: Boolean, default: false },
//   },
//   { timestamps: true, versionKey: false }
// );
// //profileSchema.index({ location: "2dsphere" });
// profileSchema.index({ "location.coordinates": "2dsphere" });

// // ✅ Add the static method here
// profileSchema.statics.blockUser = async function (userId, targetUserId) {
//   const user = await this.findById(userId);
//   if (!user) throw new Error("User not found");

//   if (!user.blockedUsers.includes(targetUserId)) {
//     user.blockedUsers.push(targetUserId);
//     await user.save();
//   }

//   return user;
// };

// module.exports = mongoose.model("userProfile", profileSchema);









const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    birthday: { type: Date, required: true },
    bio: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    interests: { type: [String], required: true },
    age: { type: Number, required: true },
    profileImages: { type: [String], required: true, default: ["default.png"] },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },

      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      
      placeName: {
        type: String, // Human-readable location
        required: true,
      },
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// Geo index for coordinates
profileSchema.index({ "location.coordinates": "2dsphere" });

// Static method to block user
profileSchema.statics.blockUser = async function (userId, targetUserId) {
  const user = await this.findById(userId);
  if (!user) throw new Error("User not found");

  if (!user.blockedUsers.includes(targetUserId)) {
    user.blockedUsers.push(targetUserId);
    await user.save();
  }

  return user;
};

module.exports = mongoose.model("userProfile", profileSchema);












