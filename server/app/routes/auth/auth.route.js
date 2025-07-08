const router=require('express').Router();
const authController=require('../../module/user/controller/auth.controller')
const authCheck=require('../../middleware/auth.middleware')();


router.post('/signup',authController.signUp)
router.post('/signin',authController.signIn)
router.post('/verify-otp',authController.verifyOtp)
router.post('/resend-otp',authController.resendOtp)
router.post('/forgot-password',authController.forgetPassword)
router.post('/reset-password/:token',authController.resetPassword)
router.post('/updatepassword',authCheck.authenticateAPI,authController.updatePassword)


// Report a user
router.post("/report/:targetUserId", authCheck.authenticateAPI, authController.reportUser);

// Get reported users (admin use)
router.get("/reported-users", authCheck.authenticateAPI, authController.getReportedUsers);







module.exports=router;