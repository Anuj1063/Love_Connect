const profileRepositories = require("../repositories/profile.repositories");
const mongoose = require('mongoose')
 

const {
  createProfileSchema,
  updateProfileSchema,
} = require("../../../validator/profile.validator");
const Profile = require("../../profile/model/profile.model");
const preferenceModel = require("../../preference/model/preference.model");
const Swipe = require("../../swipe/model/swipe.model");
const deleteFile = require("../../../helper/deleteFile");

const axios = require("axios");

class ProfileController {


  // async createProfile(req, res) {
  //   try {
  //     const { error, value } = createProfileSchema.validate(req.body, {
  //       abortEarly: false,
  //     });

  //     if (error) {
  //       if (req.files && req.files.length) {
  //         req.files.forEach((file) =>
  //           deleteFile("uploads/profile", file.filename)
  //         );
  //       }

  //       const messages = error.details.map((detail) => detail.message);
  //       return res
  //         .status(400)
  //         .json({ status: 400, data: {}, message: messages });
  //     }

  //     const { bio, gender, interests, birthday, latitude, longitude } = value;

  //     const images =
  //       req.files && req.files.length
  //         ? req.files.map((file) => file.filename)
  //         : ["default.png"];

  //     const userId = req.user._id;

  //     const calAge = (birthday) => {
  //       const today = new Date();
  //       let age = today.getFullYear() - birthday.getFullYear();
  //       const hasBirthOccurred =
  //         today.getMonth() > birthday.getMonth() ||
  //         (today.getMonth() === birthday.getMonth() &&
  //           today.getDate() >= birthday.getDate());
  //       if (hasBirthOccurred) age--;
  //       return age;
  //     };

  //     const isPreferenceExist = await preferenceModel.findOne({ userId });
  //     if (!isPreferenceExist) {
  //       await preferenceModel.create({ userId });
  //     } else {
  //       await Profile.updateOne({ userId }, { userId });
  //     }

  //     const isProfileExist = await profileRepositories.findByUserId(userId);
  //     if (isProfileExist) {
  //       if (images[0] !== "default.png") {
  //         images.forEach((img) => deleteFile("uploads/profile", img));
  //       }

  //       return res.status(400).json({
  //         status: false,
  //         message: "Profile already created",
  //       });
  //     }

  //     const lat = parseFloat(latitude);
  //     const lng = parseFloat(longitude);

  //     if (isNaN(lat) || isNaN(lng)) {
  //       images.forEach((img) => deleteFile("uploads/profile", img));
  //       return res.status(400).json({
  //         success: false,
  //         message: "Invalid latitude or longitude",
  //       });
  //     }

  //     if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
  //       images.forEach((img) => deleteFile("uploads/profile", img));
  //       return res.status(400).json({
  //         success: false,
  //         message:
  //           "Latitude must be between -90 and 90, Longitude between -180 and 180",
  //       });
  //     }

  //     const location = {
  //       type: "Point",
  //       coordinates: [lng, lat],
  //     };

  //     const profile = await profileRepositories.createProfile({
  //       bio,
  //       gender,
  //       interests,
  //       birthday,
  //       age: calAge(birthday),
  //       userId,
  //       location,
  //       profileImages: images,
  //     });

  //     return res.status(201).json({
  //       status: true,
  //       message: "Profile created successfully",
  //       data: profile,
  //     });
  //   } catch (error) {
  //     console.error("Error in profile:", error);
  //     if (req.files && req.files.length) {
  //       req.files.forEach((file) =>
  //         deleteFile("uploads/profile", file.filename)
  //       );
  //     }
  //     return res.status(500).json({ success: false, message: "Server error" });
  //   }
  // }



  async createProfile(req, res) {
  async function reverseGeocode(lat, lon) {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        format: "json",
        lat,
        lon,
      },
      headers: {
        "User-Agent": "YourAppName/1.0", // Nominatim requires this
      },
    });

    return res.data.display_name || "Unknown Location";
  } catch (err) {
    console.error("Reverse geocoding failed:", err.message);
    return "Unknown Location";
  }
}
  try {
    const { error, value } = createProfileSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      if (req.files && req.files.length) {
        req.files.forEach((file) =>
          deleteFile("uploads/profile", file.filename)
        );
      }

      const messages = error.details.map((detail) => detail.message);
      return res
        .status(400)
        .json({ status: 400, data: {}, message: messages });
    }

    const { bio, gender, interests, birthday, latitude, longitude } = value;

    const images =
      req.files && req.files.length
        ? req.files.map((file) => file.filename)
        : ["default.png"];

    const userId = req.user._id;

    const calAge = (birthday) => {
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      const hasBirthOccurred =
        today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
          today.getDate() < birthday.getDate());
      if (!hasBirthOccurred) age--;
      return age;
    };

    const isPreferenceExist = await preferenceModel.findOne({ userId });
    if (!isPreferenceExist) {
      await preferenceModel.create({ userId });
    } else {
      await Profile.updateOne({ userId }, { userId });
    }

    const isProfileExist = await profileRepositories.findByUserId(userId);
    if (isProfileExist) {
      if (images[0] !== "default.png") {
        images.forEach((img) => deleteFile("uploads/profile", img));
      }

      return res.status(400).json({
        status: false,
        message: "Profile already created",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      images.forEach((img) => deleteFile("uploads/profile", img));
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      images.forEach((img) => deleteFile("uploads/profile", img));
      return res.status(400).json({
        success: false,
        message:
          "Latitude must be between -90 and 90, Longitude between -180 and 180",
      });
    }

    // ✅ Reverse geocode to get place name
    const placeName = await reverseGeocode(lat, lng);

    // ✅ Location object with coordinates and placeName
    const location = {
      type: "Point",
      coordinates: [lng, lat],
      placeName,
    };

    const profile = await profileRepositories.createProfile({
      bio,
      gender,
      interests,
      birthday,
      age: calAge(new Date(birthday)),
      userId,
      location,
      profileImages: images,
    });

    return res.status(201).json({
      status: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error in createProfile:", error);
    if (req.files && req.files.length) {
      req.files.forEach((file) =>
        deleteFile("uploads/profile", file.filename)
      );
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

//   async getProfile(req, res) {
//     try {
//       const baseUrl = `${req.protocol}://${req.get("host")}`;

//       const profile = await Profile.aggregate([
//         {
//           $match: {
//             userId: req.user._id,
//           },
//         },
//         {
//           $lookup: {
//             from: "users",
//             localField: "userId",
//             foreignField: "_id",
//             as: "profileData",
//           },
//         },
//         {
//           $unwind: "$profileData",
//         },
//         {
//           $addFields: {
//             birthdayAsDate: { $toDate: "$birthday" },
//           },
//         },
//         {
//           $addFields: {
//             age: {
//               $dateDiff: {
//                 startDate: "$birthdayAsDate",
//                 endDate: "$$NOW",
//                 unit: "year",
//               },
//             },
//           },
//         },
//         {
//           $project: {
//             name: "$profileData.name",
//             email: "$profileData.email",
//             bio: "$bio",
//             age: "$age",
//             gender: "$gender",
//             birthday: "$birthday",
//             interests: "$interests",
//             profileImages: "$profileImages",
//             location: "$location",
//           },
//         },
//       ]);

//       if (profile) {
//         return res.status(200).json({
//           status: true,
//           message: "Profile Fetched ",
//           Data: {
//             ...profile[0],

//             profileImages: (profile[0].profileImages || []).map(
//               (img) => `${baseUrl}/uploads/profile/${img}`
//             ),
//           },
//         });
//       }
//   } catch (error) {
//     console.error("Error in error in getProfile:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// }


async getProfile(req, res) {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const profile = await Profile.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "profileData",
        },
      },
      {
        $unwind: "$profileData",
      },
      {
        $addFields: {
          birthdayAsDate: { $toDate: "$birthday" },
        },
      },
      {
        $addFields: {
          age: {
            $dateDiff: {
              startDate: "$birthdayAsDate",
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $project: {
          name: "$profileData.name",
          email: "$profileData.email",
          bio: "$bio",
          age: "$age",
          gender: "$gender",
          birthday: "$birthday",
          interests: "$interests",
          profileImages: "$profileImages",
          location: "$location",
          isPremium:"$profileData.isPremium"

        },
      },
    ]);

    if (!profile || profile.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });
    }

    const data = profile[0];

    return res.status(200).json({
      status: true,
      message: "Profile Fetched",
      Data: {
        ...data,
        profileImages: (data.profileImages || []).map(
          (img) => `${baseUrl}/uploads/profile/${img}`
        ),
        location: {
          coordinates: data.location.coordinates,
          placeName: data.location.placeName, // ✅ include placeName here
        },
      },
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


async getOtherProfile(req, res) {
  try {
    const mongoose = require("mongoose");
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const { id } = req.params;

    const profile = await Profile.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "profileData",
        },
      },
      {
        $unwind: "$profileData",
      },
      {
        $addFields: {
          birthdayAsDate: { $toDate: "$birthday" },
        },
      },
      {
        $addFields: {
          age: {
            $dateDiff: {
              startDate: "$birthdayAsDate",
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $project: {
          name: "$profileData.name",
          email: "$profileData.email",
          bio: "$bio",
          age: "$age",
          gender: "$gender",
          birthday: "$birthday",
          interests: "$interests",
          profileImages: "$profileImages",
          location: "$location",
          
        },
      },
    ]);

    if (profile && profile[0]) {
      return res.status(200).json({
        status: true,
        message: "Profile Fetched ",
        Data: {
          ...profile[0],
          profileImages: (profile[0].profileImages || []).map(
            (img) => `${baseUrl}/uploads/profile/${img}`
          ),
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });
    }
  } catch (error) {
    console.error("Error in getOtherProfile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}







  // async updateProfile(req, res) {
  //   try {
  //     const { error, value } = updateProfileSchema.validate(req.body, {
  //       abortEarly: false,
  //     });
  //     if (error) {
  //       const messages = error.details.map((detail) => detail.message);
  //       return res.status(400).send({
  //         status: 400,
  //         data: {},
  //         message: messages,
  //       });
  //     }

  //     const userId = req.user._id;
  //     const images = req.files ? req.files.map((file) => file.filename) : [];

  //     const existingProfile = await Profile.findOne({ userId });

  //     if (!existingProfile) {
  //       return res.status(404).json({
  //         status: false,
  //         message: "Profile not found",
  //       });
  //     }

  //     if (
  //       images.length > 0 &&
  //       existingProfile.profileImages &&
  //       existingProfile.profileImages.length > 0
  //     ) {
  //       existingProfile.profileImages.forEach((img) => {
  //         deleteFile("uploads/profile", img);
  //       });
  //     }

  //     // ✅ Use the validated data
  //     const updateFields = {
  //       ...value, // <- use 'value' instead of 'req.body'
  //     };

  //     if (images.length > 0) {
  //       updateFields.profileImages = images;
  //     }

  //     await Profile.updateOne({ userId }, { $set: updateFields });

  //     return res.status(200).json({
  //       status: true,
  //       message: "Profile Updated Successfully!",
  //     });
  //   } catch (error) {
  //     console.error("Error in update Profile:", error);
  //     return res.status(500).json({ success: false, message: "Server error" });
  //   }
  // }

  //////////


async updateProfile(req, res) {
  try {
    const { error, value } = updateProfileSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).send({
        status: 400,
        data: {},
        message: messages,
      });
    }

    const userId = req.user._id;
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Parse keptImages from body (can be string or array)
    let keptImages = req.body.keptImages || [];
    if (typeof keptImages === "string") {
      keptImages = [keptImages];
    }

    const existingProfile = await Profile.findOne({ userId });
    if (!existingProfile) {
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });
    }

    // Delete images that are NOT in keptImages
    const imagesToDelete = existingProfile.profileImages.filter(
      (img) => !keptImages.includes(img)
    );
    imagesToDelete.forEach((img) => {
      deleteFile("uploads/profile", img);
    });

    // Build the new image list: kept + new
    const finalImageList = [...keptImages, ...newImages];

    // Prepare update fields
    const updateFields = {
      ...value, // validated fields
      profileImages: finalImageList,
    };

    await Profile.updateOne({ userId }, { $set: updateFields });

    return res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!",
    });

  } catch (error) {
    console.error("Error in update Profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}









  // async discoverProfiles(req, res) {
  //   const baseUrl = `${req.protocol}://${req.get("host")}`;
  //   try {
  //     const currentUserProfile = await Profile.findOne({
  //       userId: req.user._id,
  //     }).lean();

  //     if (!currentUserProfile?.location?.coordinates) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Your location is not set",
  //       });
  //     }

  //     const userPreference = await preferenceModel
  //       .findOne({ userId: req.user._id })
  //       .lean();
  //     if (!userPreference) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "User preferences not set",
  //       });
  //     }
  //     const swipedUsers = await Swipe.find({ userId: req.user._id }).select(
  //       "targetId"
  //     );
  //     const swipedUserIds = swipedUsers.map((swipe) => swipe.targetId);
     

  //     const { gender, ageRange, distance } = userPreference;
  //     console.log(ageRange.max, ageRange.min);

  //     const genderCondition = gender === "all" ? {} : { gender };

  //     const maxDistanceInMeters = (distance || 50) * 1000;

  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 10;
  //     const skip = (page - 1) * limit;


  //     const nearbyProfiles = await Profile.aggregate([
  //       {
  //         $geoNear: {
  //           near: {
  //             type: "Point",
  //             coordinates: currentUserProfile.location.coordinates,
  //           },
  //           distanceField: "dist.calculated",
  //           maxDistance: maxDistanceInMeters,
  //           spherical: true,
  //           query: {
  //             isDeleted: false,
  //             userId: { $ne: req.user._id, $nin: swipedUserIds },
  //             ...genderCondition,
  //             "location.coordinates": { $exists: true, $ne: null },
  //           },
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "users",
  //           localField: "userId",
  //           foreignField: "_id",
  //           as: "userData",
  //         },
  //       },
  //       { $unwind: "$userData" },
  //       {
  //         $match: {
  //           age: {
  //             $gte: ageRange.min,
  //             $lte: ageRange.max,
  //           },
  //         },
  //       },
  //       {
  //         $project: {
  //           userId: 1,
  //           name: "$userData.name",
  //           bio: 1,
  //           age: 1,
  //           gender: 1,
  //           interests: 1,
  //           profileImages: 1,
  //           location: 1,
  //           distance: { $round: ["$dist.calculated", 0] },
  //         },
  //       },
  //       { $skip: skip },
  //       { $limit: limit },
  //     ]);

  //     if (!nearbyProfiles.length) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "No nearby users found",
  //         data: [],
  //       });
  //     }

  //     const results = nearbyProfiles.map((profile) => ({
  //       name: profile.name,
  //       userId: profile.userId,
  //       distance: `${(profile.distance / 1000).toFixed(2)} KM`,
  //       profile: {
  //         bio: profile.bio,
  //         gender: profile.gender,
  //         age: profile.age,
  //         interests: profile.interests,
  //         profileImages: profile.profileImages.map(
  //           (img) => `${baseUrl}/uploads/profile/${img}`
  //         ),
  //       },
  //     }));

  //     return res.status(200).json({
  //       success: true,
  //       message: "Nearby users fetched successfully",
  //       page,
  //       limit,
  //       userCount: results.length,
  //       data: results,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching nearby users:", error);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Server error",
  //     });
  //   }
  // };


async discoverProfiles(req, res) {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    try {
      const currentUserProfile = await Profile.findOne({
        userId: req.user._id,
      }).lean();

      if (!currentUserProfile?.location?.coordinates) {
        return res.status(400).json({
          success: false,
          message: "Your location is not set",
        });
      }

      const userPreference = await preferenceModel
        .findOne({ userId: req.user._id })
        .lean();
      if (!userPreference) {
        return res.status(400).json({
          success: false,
          message: "User preferences not set",
        });
      }
      const swipedUsers = await Swipe.find({ userId: req.user._id }).select(
        "targetId"
      );
      const swipedUserIds = swipedUsers.map((swipe) => swipe.targetId);
     

      const { gender, ageRange, distance } = userPreference;
      console.log(ageRange.max, ageRange.min);

      const genderCondition = gender === "all" ? {} : { gender };

      const maxDistanceInMeters = (distance || 50) * 1000;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const nearbyProfiles = await Profile.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: currentUserProfile.location.coordinates,
            },
            distanceField: "dist.calculated",
            maxDistance: maxDistanceInMeters,
            spherical: true,
            query: {
              isDeleted: false,
              userId: { $ne: req.user._id, $nin: swipedUserIds },
              ...genderCondition,
              "location.coordinates": { $exists: true, $ne: null },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: "$userData" },
        {
          $match: {
            age: {
              $gte: ageRange.min,
              $lte: ageRange.max,
            },
          },
        },
        {
          $project: {
            userId: 1,
            name: "$userData.name",
            bio: 1,
            age: 1,
            gender: 1,
            interests: 1,
            profileImages: 1,
            location: 1,
            distance: { $round: ["$dist.calculated", 0] },
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]);

      if (!nearbyProfiles.length) {
        return res.status(404).json({
          success: false,
          message: "No nearby users found",
          data: [],
        });
      }

      const results = nearbyProfiles.map((profile) => ({
        name: profile.name,
        userId: profile.userId,
        distance: `${(profile.distance / 1000).toFixed(2)} KM`,
        profile: {
          bio: profile.bio,
          gender: profile.gender,
          age: profile.age,
          interests: profile.interests,
          profileImages: profile.profileImages.map(
            (img) => `${baseUrl}/uploads/profile/${img}`
          ),
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Nearby users fetched successfully",
        page,
        limit,
        userCount: results.length,
        data: results,
      });
    } catch (error) {
      console.error("Error fetching nearby users:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };



  async getOtherProfile(req, res) {
    try {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const{id}=req.params;
     
  

      const profile = await Profile.aggregate([
        {
          $match: {
            userId:new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "profileData",
          },
        },
        {
          $unwind: "$profileData",
        },
        {
          $addFields: {
            birthdayAsDate: { $toDate: "$birthday" },
          },
        },
        {
          $addFields: {
            age: {
              $dateDiff: {
                startDate: "$birthdayAsDate",
                endDate: "$$NOW",
                unit: "year",
              },
            },
          },
        },
        {
          $project: {
            name: "$profileData.name",
            email: "$profileData.email",
            bio: "$bio",
            age: "$age",
            gender: "$gender",
            birthday: "$birthday",
            interests: "$interests",
            profileImages: "$profileImages",
            location: "$location",

          },
        },
      ]);

      if (profile) {
        return res.status(200).json({
          status: true,
          message: "Profile Fetched ",
          Data: {
            ...profile[0],

            profileImages: (profile[0].profileImages || []).map(
              (img) => `${baseUrl}/uploads/profile/${img}`
            ),
          },
        });
      }
    } catch (error) {
      console.error("Error in error in getProfile:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }












///////////////////////



async blockUser(req, res) {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.targetUserId;

    if (userId.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot block yourself." });
    }

    // ❌ WRONG: const updatedUser = await Profile.blockUser(userId, targetUserId);
    // ✅ CORRECT:
    const updatedUser = await profileRepositories.blockUser(userId, targetUserId);

    res.status(200).json({
      success: true,
      message: "User blocked successfully.",
      data: updatedUser.blockedUsers,
    });
  } catch (error) {
    console.error("Block user error:", error); // Always helpful
    res.status(500).json({
      message: "Failed to block user",
      error: error.message,
    });
  }
}





async unblockUser(req, res) {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.targetUserId;

    const updatedUser = await profileRepositories.unblockUser(userId, targetUserId);

    res.status(200).json({
      success: true,
      message: "User unblocked successfully.",
      data: updatedUser.blockedUsers,
    });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({
      message: "Failed to unblock user",
      error: error.message,
    });
  }
}




async deleteAccount(req, res) {
  try {
    const userId = req.user._id;

    // Optional: get profile & delete images
    const profile = await Profile.findOne({ userId });
    
    // if (profile?.profileImages?.length) {
    //   profile.profileImages.forEach((img)=>deleteFile("uploads/profile",img)) 
    // }
   

    await profileRepositories.deleteUserData(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully (soft + hard).",
    });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}



}

module.exports = new ProfileController();
