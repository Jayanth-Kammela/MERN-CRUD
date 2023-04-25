var express = require('express');
var router = express.Router();
const {forLogin,forSignup,forgetPassword,updatePassword} =require('../contoller/usercon')

router.post('/login',forLogin );
router.post('/signup', forSignup);
router.post('/forget',forgetPassword );
router.post('/reset/:token',updatePassword );
// router.put('/reset/:token',updatePassword );


module.exports = router;
