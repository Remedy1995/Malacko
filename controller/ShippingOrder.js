const ShippingOrder = require('../models/ShippingOrder');
const consignment = require('../helpers/helper');
const sendEmail = require('../controller/email');//send email information to email user
require('dotenv').config();
const formatdate = require('../helpers/formatDate');
const consign = new consignment("MALACK");
const axios = require('axios');

exports.createShippingOrder = async (req, res, next) => {
   const email = req.body.email;
   ShippingOrder.find({ 'email': new RegExp(email, 'i') }).then(data => {
      if (data.length === 0) {
         //if email does not exist record new data;
         const country = req.body.country.replace(/[^a-zA-Z ]/g, "");;
         const destination = req.body.destination.replace(/[^a-zA-Z ]/g, "");
         const data = [];
         axios.get(process.env.MAP_URL + `${destination}`)
            .then(response => {
               console.log('The link is ',process.env.MAP_URL)
               data.push(response.data);
               data.forEach(async number => {
                  const geodata = number.results[0].locations[0].latLng;
                  const location = number.results[0].providedLocation.location;//this generates the location
                  const latitude = geodata['lat'];//this generates the latitude of the location
                  const longitude = geodata['lng'];//this generates the longitude of the location
                  const value = consign.generate();//this generates the consignment number

                  const createShipping = new ShippingOrder({
                     destination: location,
                     country_latitude: latitude,
                     country_longitude: longitude,
                     email: email,
                     ItemName: req.body.ItemName.replace(/[^a-zA-Z ]/g, ""),
                     itemsDescription: req.body.itemsDescription.replace(/[^a-zA-Z ]/g, ""),
                     orderDate: formatdate.getDate(),
                     deliveryDate: req.body.date,
                     consignment_number: value,
                     trackingstatus: req.body.trackingstatus.replace(/[^a-zA-Z ]/g, ""),
                     remarks: req.body.remarks.replace(/[^a-zA-Z ]/g, ""),
                     quantity: req.body.quantity.replace(/[^a-zA-Z ]/g, ""),
                     country: country,
                     ShipperName: req.body.ShipperName.replace(/[^a-zA-Z ]/g, ""),
                     ShipperAddress: req.body.ShipperAddress.replace(/[^a-zA-Z ]/g, ""),
                     ShipperPhone: req.body.ShipperPhone.replace(/[^a-zA-Z ]/g, ""),
                     RecieverName: req.body.ReceiverAddress.replace(/[^a-zA-Z ]/g, ""),
                     ReceiverAddress: req.body.ReceiverAddress.replace(/[^a-zA-Z ]/g, ""),
                     ReceiverPhone: req.body.ReceiverPhone.replace(/[^a-zA-Z ]/g, ""),

                  })
                  sendEmail.sendMail(createShipping);//send email
                  await createShipping.save().then(docs => {
                     res.status(200).json({
                        message: "Shipping Order has been created successfully and your tracking id is "
                           + docs.consignment_number, docs
                     });
                     //send emailinformation pass information to our email    
                  }).catch(error => {
                     res.status(500).json({ message: error })
                  })
               })
            })
      }
      else {
         //if email exists update the existing data;
         const country = req.body.country;
         const data = [];
         const destination = req.body.destination.replace(/[^a-zA-Z ]/g, "");
         axios.get(process.env.MAP_URL + `${destination}`)
            .then(response => {
               data.push(response.data);
               data.forEach(async number => {
                  const geodata = number.results[0].locations[0].latLng;
                  const location = number.results[0].providedLocation.location;//this generates the location
                  const latitude = geodata['lat'];//this generates the latitude of the location
                  const longitude = geodata['lng'];//this generates the longitude of the location
                  const value = consign.generate();
                  ShippingOrder.updateMany({ email: req.body.email },
                     {
                        country: country, country_latitude: latitude, country_longitude: longitude, ItemName: req.body.ItemName.replace(/[^a-zA-Z ]/g, ""),
                        itemsDescription: req.body.itemsDescription, orderDate: formatdate.getDate(), deliveryDate: req.body.date.replace(/[^a-zA-Z ]/g, ""),
                        consignment_number: value, destination: destination, deliveryDate: req.body.date.replace(/[^a-zA-Z ]/g, ""),
                        consignment_number: value,
                        trackingstatus: req.body.trackingstatus.replace(/[^a-zA-Z ]/g, ""),
                        remarks: req.body.remarks.replace(/[^a-zA-Z ]/g, ""),
                        quantity: req.body.quantity.replace(/[^a-zA-Z ]/g, ""),
                        ShipperName: req.body.ShipperName.replace(/[^a-zA-Z ]/g, ""),
                        ShipperAddress: req.body.ShipperAddress.replace(/[^a-zA-Z ]/g, ""),
                        ShipperPhone: req.body.ShipperPhone.replace(/[^a-zA-Z ]/g, ""),
                        RecieverName: req.body.ReceiverAddress.replace(/[^a-zA-Z ]/g, ""),
                        ReceiverAddress: req.body.ReceiverAddress.replace(/[^a-zA-Z ]/g, ""),
                        ReceiverPhone: req.body.ReceiverPhone.replace(/[^a-zA-Z ]/g, ""),
                     },
                     function (err, docs) {
                        if (err) res.json(err);
                        else res.status(200).json({ message: "Shipping Order has been created successfully and your tracking id " + value });
                        console.log(docs)
                        //create object for our email handler
                        const doc = {
                           email: req.body.email,
                           consignment_number: value,
                           itemsDescription: req.body.itemsDescription
                        }
                        console.log(doc.consignment_number)
                        sendEmail.sendMail(doc);//send email
                     });
               })
            })
      }
   })

}


exports.consignment = async (req, res, next) => {
   //generate consignment number to the front end
   try {
      const cons = new consignment('Malark');
      const gen = cons.generate();
      res.json({ message: gen });
      console.log(gen)
   }
   catch (error) {
      res.status(400).json({ message: "There was an error generating consignment number" })
   }

}
// //



//
exports.viewCurrentMap = (req, res, next) => {
   //let view tracking of user using the consignment number
   const consignment_number = req.body.consignment_number;

   ShippingOrder.findOne({ 'consignment_number': new RegExp(consignment_number, 'i') }).then(data => {
      if (data === null) {
         res.status(404).json({ message: 'consignment code does not exists' })
         console.log('consignment code does not exists')
      } else {
         if (data.consignment_number !== consignment_number) {
            res.status(400).json({ message: 'Wrong consignment code provided' })
            console.log('Wrong consignment code provided');
         }
         else {
            console.log(data)
            res.status(200).json({ message: data })
         }

      }

   }).catch(error => {
      res.status(500).json({ message: error })
   })
}







exports.updateTrackingStatus = (req, res) => {
   const consignment_code = req.body.consignment_code;
   const trackingstatus = req.body.status_code;

   var email_address = '';
   ShippingOrder.find({ 'consignment_number': new RegExp(consignment_code, 'i') }).then(data => {
      if (data.length === 0) {
         res.json({
            message: "The tracking code you entered does not exist in our records"
         })
      }
      else {
         //let get our email address from the data;
         data.map(info => {
            email_address = info.email;
         })
         //if the data exist update our tracking status

         ShippingOrder.updateMany({ consignment_number: consignment_code },
            { trackingstatus: trackingstatus }).then(docs => {
               res.status(200).json({ message: "You have successfully updated the tracking status for " + consignment_code, docs })
            }).catch(error => {
               res.json({ message: "Sorry an error occured try again", error });
            })

         //create object for our email handler
         const doc = {
            email: email_address,
            consignment_number: consignment_code,
            trackingstatus: trackingstatus
         }
         sendEmail.updateTrackingCodeEmail(doc);//send new tracking status to email
      }
   });
}




















