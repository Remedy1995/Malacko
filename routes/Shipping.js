const express=require('express');
const router=express.Router();
const ShippingOrder=require('../controller/ShippingOrder')
const Authenticated = require("../middleware/Auth");


router.post('/createshipping',Authenticated.AuthenticateToken,ShippingOrder.createShippingOrder);
router.get('/consignment',ShippingOrder.consignment);
router.post('/viewmap',ShippingOrder.viewCurrentMap);
router.post('/updatetrackingstatus',ShippingOrder.updateTrackingStatus);
module.exports=router;