const mongoose = require('mongoose');
const ShippingOrderSchema={
   country:String,
   country_latitude:String,
   country_longitude:String,
   ItemName:String,
   email:String,
   itemsDescription:String,
   orderDate:String,
   deliveryDate:String,
   consignment_number:String,
   days:String

}
const ShippingOrder=mongoose.model("shippinginformation",ShippingOrderSchema);
module.exports=ShippingOrder;
