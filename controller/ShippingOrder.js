const ShippingOrder=require('../models/ShippingOrder');
const consignment=require('../helpers/helper');
const sendEmail=require('../controller/email');//send email information to email user
require('dotenv').config();
const consign=new consignment("MALACK");
const axios=require('axios');
exports.createShippingOrder=async (req,res,next)=>{
   const email=req.body.email;
   ShippingOrder.find({'email' : new RegExp(email, 'i')}).then(data=>{
   if(data.length === 0){
      //if email does not exist record new data;
           const country=req.body.country;
           const data=[];
           const formatted=country.replace(/[^a-zA-Z ]/g, "");
           axios.get(process.env.MAP_URL +`${formatted}`)
           .then(response => {
           data.push(response.data);
           data.forEach(async number=>{
           const geodata=number.results[0].locations[0].latLng;
           const location=number.results[0].providedLocation.location;//this generates the location
           const latitude=geodata['lat'];//this generates the latitude of the location
           const longitude=geodata['lng'];//this generates the longitude of the location
           const value=consign.generate();//this generates the consignment number
           const createShipping=new ShippingOrder({
           country:location,
           country_latitude:latitude,
           country_longitude:longitude,
           email:email,
           ItemName:req.body.ItemName,
           itemsDescription:req.body.itemsDescription,
           orderDate:req.body.orderDate,
           deliveryDate:req.body.deliveryDate,
           consignment_number:value,
           days:req.body.days
         })
         sendEmail.sendMail(createShipping);//send email
        await createShipping.save().then(docs=>{
        res.status(200).json({message:"Shipping Order has been created successfully and your tracking id "
        +docs.consignment_number,docs});
        //send emailinformation pass information to our email    
      }).catch(error=>{
       res.status(500).json({message:error})
      }) 
           })     
           })
     }
   else{
      //if email exists update the existing data;
         const country=req.body.country;
         const data=[];
         const formatted=country.replace(/[^a-zA-Z ]/g, "");
         axios.get(process.env.MAP_URL +`${formatted}`)
         .then(response => {
         data.push(response.data);
         data.forEach(async number=>{
         const geodata=number.results[0].locations[0].latLng;
         const location=number.results[0].providedLocation.location;//this generates the location
         const latitude=geodata['lat'];//this generates the latitude of the location
         const longitude=geodata['lng'];//this generates the longitude of the location
         const value=consign.generate();
      ShippingOrder.updateMany({email:req.body.email},
         {country:location, country_latitude:latitude,country_longitude:longitude,ItemName:req.body.ItemName,
         itemsDescription:req.body.itemsDescription,orderDate:req.body.orderDate,deliveryDate:req.body.deliveryDate,
         consignment_number:value, days:req.body.days},
          function(err, docs){
    if(err) res.json(err);
    else res.status(200).json({message:"Shipping Order has been created successfully and your tracking id "+value});
   console.log(docs) 
   //create object for our email handler
   const doc = { email:req.body.email,
               consignment_number:value,
               itemsDescription:req.body.itemsDescription
              }
              console.log(doc.consignment_number)
    sendEmail.sendMail(doc);//send email
  });
   })
   })
}
  })

}


exports.consignment=async (req,res,next)=>{
 //generate consignment number to the front end
try {
  const cons=new consignment('Malark');
  const gen=cons.generate();
  res.json({message:gen});
  console.log(gen)
}
catch(error){
   res.status(400).json({message:"There was an error generating consignment number"})
}

 }
// //



//
exports.viewCurrentMap=(req,res,next)=>{
//let view tracking of user using the consignment number
const consignment_number=req.body.consignment_number;
ShippingOrder.find({'consignment_number' : new RegExp(consignment_number, 'i')}).then(data=>{
 if(data.length===0){
   res.status(500).json({
      message:"No information available"
   })
 }
 else{
   res.json({
      message:data
   })
 }


}).catch(error=>{
   res.status(500).json({
      error:error
   })
}

)
}
  

  














