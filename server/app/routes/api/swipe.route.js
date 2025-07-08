const router=require('express').Router();
const swipeController=require('../../module/swipe/controller/swipe.controller')
const authCheck=require('../../middleware/auth.middleware')();



router.post('/:id',authCheck.authenticateAPI,swipeController.swipeUser);
router.get('/likes',authCheck.authenticateAPI,swipeController.showLikesOfUsers);


module.exports=router;