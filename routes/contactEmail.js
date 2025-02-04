const express = require('express');
const router = express.Router();
const contactUsEmail = require('../controller/email');

router.post('/contactUsEmail', contactUsEmail.contactUsEmail);
module.exports = router;