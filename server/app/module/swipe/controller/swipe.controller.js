const mongoose = require("mongoose");
const userModel = require("../../user/model/user.model");
const matchService = require("../services/match.service");
const profileModel=require('../../profile/model/profile.model')
const Swipe = require("../model/swipe.model");

const swipeRepository = require("../repositories/swipe.repositories");

class SwipeController {
  async swipeUser(req, res) {
    try {
      const userId = req.user._id;
      const targetId = req.params.id;
      const { type } = req.body;

      if (!["like", "dislike"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Type must be 'like' or 'dislike'",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(targetId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid target user ID" });
      }

      if (userId.toString() === targetId) {
        return res
          .status(400)
          .json({ success: false, message: "You can't swipe on yourself" });
      }

      const target = await userModel.findById(targetId);
      if (!target) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const alreadySwiped = await swipeRepository.findSwipe(userId, targetId);
      if (alreadySwiped) {
        return res.status(400).json({
          success: false,
          message: `You already ${alreadySwiped.type}d this user`,
        });
      }

      const swipe = await swipeRepository.createSwipe(userId, targetId, type);

      let matchInfo = {};
      if (type === "like") {
        matchInfo = await matchService.checkMatchExists(userId, targetId);
      }

      return res.status(201).json({
        success: true,
        message: `You ${type}d  ${target.name}`,
        data: swipe,
      });
    } catch (error) {
      console.error("Error in swipeUser:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  async showLikesOfUsers(req, res) {
  try {
    const userId = req.user._id;

    // Get current user's coordinates
    const currentUserProfile = await profileModel.findOne({ userId });
    if (
      !currentUserProfile ||
      !currentUserProfile.location ||
      !currentUserProfile.location.coordinates
    ) {
      return res
        .status(400)
        .json({ status: false, message: "User location not available" });
    }

    const userCoords = currentUserProfile.location.coordinates; // [lng, lat]
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const data = await Swipe.aggregate([
      {
        $match: {
          targetId: userId,
          type: "like",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: "userprofiles",
          localField: "userId",
          foreignField: "userId",
          as: "profileData",
        },
      },
      { $unwind: "$profileData" },
      {
        $project: {
          type: 1,
          name: "$userDetails.name",
          email: "$userDetails.email",
          gender: "$profileData.gender",
          interests: "$profileData.intersests",
          age: "$profileData.age",
          profileImages: "$profileData.profileImages",
          location: "$profileData.location.coordinates",
        },
      },
    ]);

    // Haversine Distance Function
    const calculateDistance = ([lng1, lat1], [lng2, lat2]) => {
      const toRad = (val) => (val * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) ** 2;
      return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
    };

    const response = data.map((i) => ({
      name: i.name,
      type: i.type,
      email: i.email,
      gender: i.gender,
      interests: i.interests,
      age: i.age,
      profileImages: i.profileImages.map(
        (img) => `${baseUrl}/uploads/profile/${img}`
      ),
      distanceInKm: calculateDistance(userCoords, i.location),
    }));

    res.status(200).json({ status: true, data: response });
  } catch (error) {
    console.error("Error in showLikesOfUsers:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
}

}

module.exports = new SwipeController();
