const router = require("express").Router();
const authCheck = require("../../middleware/auth.middleware")();
const commentController = require("../../module/comments/controller/comment.controller");
const adminCheck= require("../../middleware/admin.middleware")

//router.get("/jokes", messageController.sendJoke);

router.post("/comment",authCheck.authenticateAPI, commentController.createComment);


// for do user commnted or not
router.get("/has-commented", authCheck.authenticateAPI, commentController.hasUserCommented);


router.get("/comment/:id", authCheck.authenticateAPI,commentController.findCommentByProfileId);

router.get("/allcoments",authCheck.authenticateAPI, commentController.allComments);


//admins sections
 
router.get("/admin/getallcoments",authCheck.authenticateAPI,adminCheck,commentController.allCommentsAdmin)

// for disable comment
router.get('/disableComment/:id',commentController.disableComment);

// for enable comment
router.get('/enableComment/:id',commentController.enableComment);

 
module.exports = router;
