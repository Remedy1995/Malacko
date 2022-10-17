const express=require('express');
const router=express.Router();
const cors=require('cors');
const ShippingOrder=require('../controller/ShippingOrder')
router.use(cors());
router.post('/createshipping',ShippingOrder.createShippingOrder);
router.get('/consignment',ShippingOrder.consignment);
router.post('/viewmap',ShippingOrder.viewCurrentMap);
router.post('/updatetrackingstatus',ShippingOrder.updateTrackingStatus);
module.exports=router;