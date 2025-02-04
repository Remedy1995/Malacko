const express=require('express');
const router=express.Router();
const mapShipping=require('../controller/Map');

router.post('/mapping',mapShipping.searchMapCordinates);
module.exports=router;