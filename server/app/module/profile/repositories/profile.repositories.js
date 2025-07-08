const profileModel=require('../model/profile.model');
const userModel= require('../../user/model/user.model');
const messageModel = require("../../message/model/message.model")
const matchModel = require("../../match/model/match.model")

class ProfileRepositories{

    async createProfile(data){
        return await profileModel.create(data)
    }
    async findByUserId(userId){
        return await profileModel.findOne({userId})
    }
    
    async findAllUSers(){
        return await profileModel.find({isDeleted:false})
    }


      
    
    
  async blockUser(userId, targetUserId) {
  const userProfile = await profileModel.findOne({ userId });

  if (!userProfile) throw new Error("User not found");

  if (!userProfile.blockedUsers.includes(targetUserId)) {
    userProfile.blockedUsers.push(targetUserId);
    await userProfile.save();
  }

  return userProfile;
}




  async unblockUser(userId, targetUserId) {
  const userProfile = await profileModel.findOne({ userId });

  if (!userProfile) throw new Error("User not found");

  userProfile.blockedUsers = userProfile.blockedUsers.filter(
    (id) => id.toString() !== targetUserId
  );
  await userProfile.save();

  return userProfile;
}


  async isBlocked(userId, targetUserId) {
    const user = await profileModel.findById(userId);
    if (!user) return false;
    return user.blockedUsers.includes(targetUserId);
  };




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

}

module.exports=new ProfileRepositories();