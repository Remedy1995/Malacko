const express=require('express');
const router=express.Router();
const cors=require('cors');
const contactUsEmail=require('../controller/email');
router.use(cors());
router.post('/contactUsEmail',contactUsEmail.contactUsEmail);
module.exports=router;