const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const contactUsEmail = require('./routes/contactEmail');
const mapping = require('./routes/Map');
const shipping = require('./routes/Shipping');
const connection = require('./controller/Auth');
const cookieParser = require('cookie-parser');
const SubscriptionPackage = require('./routes/Subscription');

const User = require("./routes/User");
connection();//database;

app.use(cookieParser());  // ✅ Parse cookies first
app.use(express.json());  // ✅ Parse JSON requests
app.use(cors({
    origin: process.env.FRONTEND_PROD_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],  // ✅ Allow Set-Cookie
    exposedHeaders: ['Set-Cookie'],  // ✅ Ensure Set-Cookie is readable
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/public/dist/malacko')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname +
//     '/public/dist/malacko/index.html'));
// });
app.use('/shipping', shipping);
app.use('/mapping', mapping);
app.use('/auth',User);
app.use('/subscription',SubscriptionPackage)
app.use('/contactUsEmail', contactUsEmail);
app.use(bodyparser.urlencoded({ extended: true }));
app.get('/geocode', (req, res) => { })
app.listen(port, () => {
  console.log(`Logistics app listening on port ${port}`)
})

