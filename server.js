const express = require('express');
require('dotenv').config();
const path = require('path');
const cors=require('cors');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const mapping=require('./routes/Map')
const shipping=require('./routes/Shipping');
const connection=require('./controller/Auth');
connection();//database;
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + 'Malacko/dist/malacko'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'Malacko/dist/malacko/index.html'));});
app.use('/shipping',shipping);
app.use('/mapping',mapping)
app.use(bodyparser.urlencoded({extended:true}));
app.get('/geocode', (req,res) => {})
app.listen(process.env.PORT|| port, () => {
  console.log(`Example app listening on port ${port}`)
})

