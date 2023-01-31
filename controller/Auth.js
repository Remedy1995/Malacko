require('dotenv').config()
const mongoose = require('mongoose');
const mongodb = process.env.MONGODB;

function ConnectDB() {
  mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('successful connection to the database')
  }).catch(err => {
    console.log("error connecting to the database", err.message)
  });
}





module.exports = ConnectDB;