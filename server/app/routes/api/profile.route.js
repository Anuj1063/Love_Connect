const router=require('express').Router();
const profileController=require('../../module/profile/controller/profile.controller')
const authCheck=require('../../middleware/auth.middleware')();
const profilerUploader = require("../../helper/uploadIprofile");

const profileUpload = new profilerUploader({
  folderName: "uploads/profile",
  supportedFiles: ["image/jpeg", "image/png", "image/jpg"],
  fieldSize: 1024 * 1024 * 8,
});
router.get('/',authCheck.authenticateAPI,profileController.getProfile)
router.post('/insert',authCheck.authenticateAPI,profileUpload.upload().array('profileImages',5),profileController.createProfile);
router.post('/update',authCheck.authenticateAPI ,profileUpload.upload().array('profileImages',5),profileController.updateProfile)
router.get('/discover', authCheck.authenticateAPI, profileController.discoverProfiles);

////my work
router.get("/otheruser/:id",authCheck.authenticateAPI,profileController.getOtherProfile);

  //block a user   added my meeee
  router.post("/block/:targetUserId", authCheck.authenticateAPI, profileController.blockUser);

// Unblock a user
router.post("/unblock/:targetUserId", authCheck.authenticateAPI, profileController.unblockUser);


router.delete(
  "/delete",
  authCheck.authenticateAPI,
  profileController.deleteAccount
);


module.exports=router;