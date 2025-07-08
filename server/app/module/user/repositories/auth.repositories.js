const userModel = require("../model/user.model");
const otpModel = require("../model/otp.model");

class AuthRepository {
  async createUser(data) {
    return userModel.create(data);
  }
  async findUserByEmail(email) {
    return userModel.findOne({ email });
  } 
  async deleteUserById(userId) {
    return userModel.findByIdAndDelete(userId);
  }
  async otpRecord(userId, otp) {
    return otpModel.findOne({ userId, otp });
  }
  async markUserVerified(userId) {
    return userModel.findByIdAndUpdate(userId, { isVerified: true });
  }
  async deleteUserOtps(userId) {
    return otpModel.deleteMany({ userId });
  }
   async findUserById(id) {
    return userModel.findById(id);
  };


  
  async reportUser(reportedUserId, reporterId, reason) {
    const user = await userModel.findById(reportedUserId);
    if (!user) throw new Error("User to report not found");

    user.reports.push({
      reportedBy: reporterId,
      reason,
    });

    await user.save();
    return user;
  }



  async getReportedUsers() {
    return await userModel.aggregate([
      { $match: { "reports.0": { $exists: true } } },
      { $unwind: "$reports" },
      {
        $lookup: {
          from: "users",
          localField: "reports.reportedBy",
          foreignField: "_id",
          as: "reporterDetails",
        },
      },
      { $unwind: "$reporterDetails" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          totalReports: { $sum: 1 },
          reports: {
            $push: {
              reason: "$reports.reason",
              reportedAt: "$reports.createdAt",
              reportedBy: {
                _id: "$reporterDetails._id",
                name: "$reporterDetails.name",
                email: "$reporterDetails.email",
              },
            },
          },
        },
      },
      { $sort: { totalReports: -1 } },
    ]);
  }



  ///////


  async deleteUserData  (userId) {
  // Soft delete user and profile
  await userModel.updateOne(
    { _id: userId },
    { $set: { isDeleted: true } }
  );

  await profileModel.updateOne(
    { userId: userId },
    { $set: { isDeleted: true } }
  );

  // Hard delete messages sent or received by the user
  await messageModel.deleteMany({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });

  // Hard delete matches involving the user
  await matchModel.deleteMany({
    $or: [{ user1: userId }, { user2: userId }],
  });
};


async updateUserPassword(userId, password) {
    return userModel.findOneAndUpdate({ _id: userId }, { $set: { password } });
  }
}

module.exports = new AuthRepository();
