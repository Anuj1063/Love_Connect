const express= require('express');

const router= express.Router();
const adminController= require("../../module/admin/controller/admin.controller")
const authCheck=require('../../middleware/auth.middleware')()

const adminCheck= require("../../middleware/admin.middleware")

router.get("/getallusers",authCheck.authenticateAPI,adminCheck,adminController.getAllUser);

router.get("/getallpast-users",authCheck.authenticateAPI,adminCheck,adminController.getAllPastUsers)

router.post('/getDeletedUserAccount/:id', authCheck.authenticateAPI, adminCheck,adminController.getBackPastUser);
// ✅ Suspend user (block)
router.post('/suspend/:id', authCheck.authenticateAPI, adminCheck,adminController.SuspendUser);

// ✅ Unsuspend user (unblock)
router.post('/unsuspend/:id', authCheck.authenticateAPI, adminCheck,adminController.UnSuspendUser);

// ✅ Edit user details
router.post('/edit/:id', authCheck.authenticateAPI, adminCheck,adminController.editUserDetails);

//view user with all the details
router.get("/userdetails/:id",authCheck.authenticateAPI, adminCheck,adminController.getUserFullDetails);


module.exports= router