const router=require('express').Router()
const matchController=require('../../module/match/controller/match.controller')
const authCheck=require('../../middleware/auth.middleware')()

router.get('/matches', authCheck.authenticateAPI,matchController.getMatches);

module.exports=router;