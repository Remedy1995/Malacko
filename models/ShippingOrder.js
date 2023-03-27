const mongoose = require('mongoose');
const ShippingOrderSchema = {
   destination: String,
   country_latitude: String,
   country_longitude: String,
   ItemName: String,
   email: String,
   itemsDescription: String,
   orderDate: String,
   deliveryDate: String,
   consignment_number: String,
   country: String,
   trackingstatus: String,
   quantity: String,
   remarks: String,
   ShipperName: String,
   ShipperAddress: String,
   ShipperPhone: Number,
   RecieverName: String,
   ReceiverAddress: String,
   ReceiverPhone: Number

}
const ShippingOrder = mongoose.model("shippinginformation", ShippingOrderSchema);
module.exports = ShippingOrder;
