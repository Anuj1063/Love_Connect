const commentModel = require('../Model/comment.Model');

const mongoose = require('mongoose');

class commentRepositories{

    // async createComment(data){
    //     try{
    //         const newComment = new commentModel({
    //             userId: new mongoose.Types.ObjectId(data.userId),
    //             comment: data.comment,
    //             rating: data.rating || null,
    //         })

    //         await newComment.save();
    //         return newComment;
    //     }catch(err){
    //         throw new Error('Error saving comment: ' + err.message);

    //     }
    // }


    async createComment(data) {
  try {
    // ✅ Check if this user already submitted a comment
    const existing = await commentModel.findOne({
      userId: new mongoose.Types.ObjectId(data.userId),
      isDelete: false // optional: if you're soft deleting comments
    });

    if (existing) {
      throw new Error('You have already submitted feedback.');
    }

    // ✅ Create new comment
    const newComment = new commentModel({
      userId: new mongoose.Types.ObjectId(data.userId),
      comment: data.comment,
      rating: data.rating || null,
    });

    await newComment.save();
    return newComment;
  } catch (err) {
    throw new Error('Error saving comment: ' + err.message);
  }
}

  

  // updateCourseRating
  async updateCourseRating(courseId, avgRating) {
    // Just in case someone calls this directly with unrounded input
    const rounded = Math.round(avgRating * 2) / 2;

    return courseModel.findByIdAndUpdate(
        courseId,
        { rating: rounded },   // Store as Number, not String
        { new: true }
    );
}



    // findAllComments
   async getAllComments(filter = {}) {
  const comments = await commentModel.aggregate([
    {
      $match: filter
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails'
      }
    },

    {
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $lookup: {
        from: 'userprofiles',
        localField: 'userId',
        foreignField: 'userId',
        as: 'userProfileDetails'
      }
    },
    
    {
      $unwind: {
        path: '$userProfileDetails',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        comment: 1,
        rating: 1,
        createdAt: 1,
        'userDetails.name': 1,
        'userProfileDetails.profileImages':1
        
       
      }
   },

    {
      $sort: { 
        rating: -1,
        createdAt: -1 

       } 
    }
  ]);

  return comments;
}


//deseable coment
    async disableComment(id) {
      try {
        return await commentModel.findByIdAndUpdate(id, { isDelete: true },{ new: true });
      } catch (err) {
        throw new Error("Error disabling comment: " + err.message);
      }
      
    }
//enable comment
    async enableComment(id) {
      try {
        return await commentModel.findByIdAndUpdate(id, { isDelete: false },{ new: true });
      } catch (err) {
        throw new Error("Error enabling comment: " + err.message);
      }
      
    }

///////
    async hasUserCommented(userId) {
  return await commentModel.findOne({
    userId: new mongoose.Types.ObjectId(userId),
    isDelete: false
  });
}


   
    
}
module.exports=new commentRepositories();