const { Validator } = require('node-input-validator');
const commentRepositories = require('../../comments/repositories/comment.reposetries');

class commentController {
  // 🔹 Create a comment
  async createComment(req, res) {
   try {
    const v = new Validator(req.body, {
      comment: 'required|string',
  rating: 'integer|min:1|max:5'
    });

    const matched = await v.check();
    if (!matched) {
      return res.status(400).json({ success: false, errors: v.errors });
    }

    const { comment, rating } = req.body;
    const userId = req.user?._id;

    const feedback = await commentRepositories.createComment({
      userId,
      comment,
      rating
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your feedback!',
      comment: feedback
    });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: err.message || err,
    });
  }
}




  // 🔹 Get comments by profile ID
  async findCommentByProfileId(req, res) {
    try {
      const id = req.params.profileId;

      const profileComments = await commentRepositories.findProfileComment(id);

      const hasComments = Array.isArray(profileComments) && profileComments.length > 0;

      return res.status(200).json({
        success: true,
        message: hasComments ? "Comments fetched successfully." : "No comments found.",
        comment: hasComments ? profileComments : []
      });
    } catch (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal server error.',
        error: err.message || err,
      });
    }
  }

  

  // 🔹 Get all comments (admin/debug view)
  async allComments(req, res) {
    try {
      const comments = await commentRepositories.getAllComments({isDelete:false});

      return res.status(200).json({
        success: true,
        message: "All comments fetched successfully.",
        comments
      });
    } catch (err) {
      console.error('Error fetching all comments:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal server error.',
        error: err.message || err,
      });
    }
  }

async allCommentsAdmin(req, res) {
    try {
      const comments = await commentRepositories.getAllComments();

      return res.status(200).json({
        success: true,
        message: "All comments fetched successfully.",
        comments
      });
    } catch (err) {
      console.error('Error fetching all comments:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal server error.',
        error: err.message || err,
      });
    }
  }




   //desable comment
    async disableComment(req,res){
        try{
            const id = req.params.id;
            const disableComment = await commentRepositories.disableComment(id);
            return res.status(200).json({
                disableComment
            })
        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }
//enable comment
    async enableComment(req,res){
        try{
            const id = req.params.id;
            const enableComment = await commentRepositories.enableComment(id);
            return res.status(200).json({
                enableComment
            })
        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }



    async hasUserCommented(req, res) {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    const existing = await commentRepositories.hasUserCommented(userId);

    return res.status(200).json({
      success: true,
      hasCommented: !!existing,
    });
  } catch (err) {
    console.error("Error checking comment:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message || err,
    });
  }
}

}

module.exports = new commentController();
