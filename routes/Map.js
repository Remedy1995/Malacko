const express=require('express');
const router=express.Router();
const cors=require('cors');
const mapShipping=require('../controller/Map');
router.use(cors());
router.post('/mapping',mapShipping.searchMapCordinates);
module.exports=router;