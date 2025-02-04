const express = require('express');
const router = express.Router();
const Subscription = require("../controller/Subscription");
const Auth = require("../middleware/Auth");

router.get('/subscription',Auth.AuthenticateToken,Subscription.UserSubscriptionInfo);
module.exports = router;