const express = require('express');
const router = express.Router();
const User = require("../controller/User");
const Auth = require("../middleware/Auth");

router.post('/login',User.LoginUser);
router.post('/signup',User.createNewUser);
router.get('/user-info',Auth.AuthenticateToken,User.userInformation);
module.exports = router;