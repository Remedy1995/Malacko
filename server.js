const express = require('express');
require('dotenv').config();
const path = require('path');
const cors=require('cors');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT||3000;
const mapping=require('./routes/Map')
const shipping=require('./routes/Shipping');
const connection=require('./controller/Auth');
connection();//database;
app.use(cors());
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Remedy:Remedy1995@cluster0.swuc4.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   console.log(err)
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// app.use('/assets', express.static(path.join(__dirname, '/dist/malacko/public')))
// app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname + '/public/dist/malacko')));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/public/dist/malacko/index.html'));});
app.use('/shipping',shipping);
app.use('/mapping',mapping)
app.use(bodyparser.urlencoded({extended:true}));
app.get('/geocode', (req,res) => {})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

