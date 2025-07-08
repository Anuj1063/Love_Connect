const swipeModel = require("../model/swipe.model");

class SwipeRepository{
async findSwipe (userId, targetId){
  return await swipeModel.findOne({ userId, targetId });
};

async createSwipe(userId, targetId, type) {
  return await swipeModel.create({ userId, targetId, type });
};
}


module.exports = new SwipeRepository();
