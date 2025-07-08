const router = require("express").Router();
const authCheck = require("../../middleware/auth.middleware")();
const messageController = require("../../module/message/controller/message.controller");
const profilerUploader = require("../../helper/messagePhotoUpload");

const profileUpload = new profilerUploader({
  folderName: "uploads/message",
  supportedFiles: ["image/jpeg", "image/png", "image/jpg"],
  fieldSize: 1024 * 1024 * 4,
});
router.get("/jokes", messageController.sendJoke);

router.get("/:id", authCheck.authenticateAPI,messageController.getMessages);
router.post("/send/:id", authCheck.authenticateAPI,profileUpload.upload().single('image'),messageController.sendMessage);
//for the jokes

 
module.exports = router;
