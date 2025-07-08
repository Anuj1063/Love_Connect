const userDetails = require("../repository/admin.repository");
const ProfileModel = require("../../profile/model/profile.model");
const matchesModel = require("../../match/model/match.model");
const preferenceModel = require("../../preference/model/preference.model");
const swipeModel = require("../../swipe/model/swipe.model");
const mongoose = require("mongoose");
const userModel = require("../../user/model/user.model");

class adminController {
  async getAllUser(req, res) {
    try {
      const allUser = await userDetails.findAllUsers();
      if (!allUser) {
        return res.status(400).json({
          message: "No user found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "users fetched successfully",
        data: allUser,
      });
    } catch (error) {
      res.status(400).json({
        message: "User fetch faield",
        error: err.message || err,
      });
    }
  }


   async getAllPastUsers(req, res) {
    try {
      const allUserpastUsers = await userDetails.findAllPastUsers();
      if (!allUserpastUsers) {
        return res.status(400).json({
          message: "No user found",
        });
      }

      return res.status(200).json({
        success: true,
        message: " Pasts users fetched successfully",
        data: allUserpastUsers,
      });
    } catch (error) {
      res.status(400).json({
        message: " Pasts User fetch faield",
        error: err.message || err,
      });
    }
  }



  async getBackPastUser(req, res) {
    try {
      const { id } = req.params;
      const getDeletedUser = await userDetails.retrivePastUserAccount(id);

      if (!getDeletedUser) {
        return res.status(400).json({
          message: "No user is available!!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "users account retived successfully",
        data: getDeletedUser,
      });
    } catch (error) {
      res.status(400).json({
        message: "Unable to unsuspend user",
        error: error.message || error, // ✅ corrected
      });
    }
  }

//   async getAllUser(req, res) {
//   try {
//     const allUsers = await ProfileModel.aggregate([
//       {
//         $lookup: {
//           from: "profiles", // ✅ This is the ProfileModel collection
//           localField: "_id", // userDetails._id
//           foreignField: "userId", // ProfileModel.userId
//           as: "profile"
//         }
//       },
//       {
//         $unwind: {
//           path: "$profile",
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $project: {
//           name: 1,
//           email: 1,
//           profileImage: { $arrayElemAt: ["$profile.profileImages", 0] },
//           bio: "$profile.bio",
//           gender: "$profile.gender",
//           age: "$profile.age"
//         }
//       }
//     ]);

//     if (!allUsers || allUsers.length === 0) {
//       return res.status(400).json({ message: "No users found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Users fetched successfully",
//       data: allUsers
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: "User fetch failed",
//       error: err.message || err
//     });
//   }
// }

 


  async SuspendUser(req, res) {
    try {
      const id = req.params.id;

      const getUser = await userDetails.suspendUser(id);

      if (!getUser) {
        return res.status(400).json({
          message: "No user is available!!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "user Blocked successfully",
        data: getUser,
      });
    } catch (error) {
      res.status(400).json({
        message: "Unable to block user",
        error: err.message || err,
      });
    }
  }

  async UnSuspendUser(req, res) {
    try {
      const { id } = req.params;
      const getUserUnblock = await userDetails.unSuspendUser(id);

      if (!getUserUnblock) {
        return res.status(400).json({
          message: "No user is available!!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "user unBlocked successfully",
        data: getUserUnblock,
      });
    } catch (error) {
      res.status(400).json({
        message: "Unable to unsuspend user",
        error: error.message || error, // ✅ corrected
      });
    }
  }

  async editUserDetails(req, res) {
    try {
      const id = req.params.id;
      const { name, email } = req.body;

      const updateData = { name, email };

      const updatedUser = await userDetails.editUserDetails(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User details updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user details:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async getUserFullDetails(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user ID format" });
      }

      const userId = new mongoose.Types.ObjectId(id);

      // 1. Aggregate user with reports
      const userAgg = await userModel.aggregate([
        {
          $match: {
            _id: userId,
            $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "reports.reportedBy",
            foreignField: "_id",
            as: "reportUsers",
          },
        },
        {
          $addFields: {
            reportsDetailed: {
              $map: {
                input: "$reports",
                as: "report",
                in: {
                  reason: "$$report.reason",
                  createdAt: "$$report.createdAt",
                  reportedBy: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$reportUsers",
                          as: "ru",
                          cond: { $eq: ["$$ru._id", "$$report.reportedBy"] },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            isPremium: 1,
            isSuspended: 1,
            reportsDetailed: 1,
          },
        },
      ]);

      if (!userAgg || userAgg.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userData = userAgg[0];

      // 2. Get Profile
      const profile = await ProfileModel.findOne({ userId }).lean();

      // 3. Get Preferences
      const preference = await preferenceModel.findOne({ userId }).lean();

      // 4. Get Likes using aggregation
      const likes = await swipeModel.aggregate([
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
          $project: {
            name: "$userDetails.name",
            email: "$userDetails.email",
            at: "$createdAt",
          },
        },
      ]);

      // 5. Get Matches using aggregation
      const matches = await matchesModel.aggregate([
        {
          $match: {
            $or: [{ user1: userId }, { user2: userId }],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user1",
            foreignField: "_id",
            as: "user1Data",
          },
        },
        { $unwind: "$user1Data" },
        {
          $lookup: {
            from: "users",
            localField: "user2",
            foreignField: "_id",
            as: "user2Data",
          },
        },
        { $unwind: "$user2Data" },
        {
          $project: {
            createdAt: 1,
            matchWith: {
              $cond: {
                if: { $eq: ["$user1", userId] },
                then: "$user2Data.name",
                else: "$user1Data.name",
              },
            },
            email: {
              $cond: {
                if: { $eq: ["$user1", userId] },
                then: "$user2Data.email",
                else: "$user1Data.email",
              },
            },
          },
        },
      ]);

      // 6. Final response object
      const result = {
        basicInfo: {
          name: userData.name,
          email: userData.email,
          isSuspended: userData.isSuspended || false,
          isPremium: userData.isPremium || false,
        },
        profile,
        preference,
        totalLikes: likes.length,
        likedBy: likes.map((like) => ({
          name: like.name,
          email: like.email,
          at: like.at,
        })),
        totalReports: userData.reportsDetailed?.length || 0,
        reports:
          userData.reportsDetailed?.map((r) => ({
            reason: r.reason,
            createdAt: r.createdAt,
            reportedBy: r.reportedBy?.name || "Unknown",
            email: r.reportedBy?.email || "Unknown",
          })) || [],
        totalMatches: matches.length,
        matches: matches.map((m) => ({
          matchWith: m.matchWith,
          email: m.email,
          createdAt: m.createdAt,
        })),
        totalBlockedUsers: profile?.blockedUsers?.length || 0,
        blockedUsers: profile?.blockedUsers || [],
      };

      return res.status(200).json({
        success: true,
        message: "User full details fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("getUserFullDetails error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new adminController();
