const matchModel = require("../model/match.model");

class MatchController {
  async getMatches(req, res) {
    try {
      const userId = req.user._id;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const matches = await matchModel.aggregate([
        // Step 1: Match all documents where user1 or user2 is the current user
        {
          $match: {
            $or: [{ user1: userId }, { user2: userId }],
          },
        },

        // Step 2: Use $cond to select the other user (not the logged-in one)
        {
          $project: {
            matchedUser: {
              $cond: [{ $eq: ["$user1", userId] }, "$user2", "$user1"],
            },
          },
        },

        // Step 3: Join with User collection to get matched user details
        {
          $lookup: {
            from: "users",
            localField: "matchedUser",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },

        // Step 4: Join with Profile collection for full profile info
        {
          $lookup: {
            from: "userprofiles",
            localField: "matchedUser",
            foreignField: "userId",
            as: "profileDetails",
          },
        },
        {
          $unwind: "$profileDetails",
        },

        // Step 5: Project final response structure
        {
          $project: {
            _id: 0,
            userId: "$matchedUser",
            name: "$userDetails.name",
            email: "$userDetails.email",
            bio: "$profileDetails.bio",
            gender: "$profileDetails.gender",
            interests: "$profileDetails.interests",
            profileImages: "$profileDetails.profileImages",
          },
        },
      ]);

      if (!matches || matches.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No matches found",
          data: [],
        });
      }

 return res.status(200).json({
  success: true,
  matchCount: matches.length,
  message: "Matches fetched successfully",
  data: matches.map((profile) => {
    return {
      ...profile,
      profileImages: profile.profileImages.map(
        (img) => `${baseUrl}/uploads/profile/${img}`
      ),
    };
  }),
});

    } catch (error) {
      console.error("Error fetching matches:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
}

module.exports = new MatchController();
