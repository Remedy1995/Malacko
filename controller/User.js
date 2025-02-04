const User = require('../models/User');
const Response = require('../init/Response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Subscription = require('../models/Subscription');



const userInformation = async (req, res) => {
  const userId = req.userId;
  console.log('my userId', userId)
  try {
    const userInfo = await User.findOne({ _id: userId }).select('-password -confirm_password -createdAt').exec();
    // const orderInformation = await Order.findOne({ user: userId }).populate("billingAddress").populate("shippingAddress").select('-total -items -user -status -transaction_id -id')
    //   .exec();
    // const concatObject = [...searchUser, ...orderInformation]
    //console.log('ordered informamtion', concatObject)
    var newSuccess = new Response(200, userInfo, 'Success');
   
    return res.status(200).json(newSuccess.successObject());
  }
  catch (error) {
    let newError = new Response(500, 'Internal Server Error', error.message);
    return res.status(500).json(newError.errorObject());
  }

}
const createNewUser = async (req, res) => {

  const { phone, email, password, firstname, lastname } = req.body;
  if (!phone) {
    return res.status(422).json({
      status: false,
      message: 'Sorry Phone is required'
    })
  }

  if (!email) {
    return res.status(422).json({
      status: false,
      message: 'Sorry email is required'
    })
  }
  if (!firstname) {
    return res.status(422).json({
      status: false,
      message: 'Sorry First Name is required'
    })
  }

  if (!lastname) {
    return res.status(422).json({
      status: false,
      message: 'Sorry Last Name is required'
    })
  }

  if (!password) {
    return res.status(422).json({
      status: false,
      message: 'Sorry Password  is required'
    })
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createUser = new User({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: hashedPassword
    });

    const response = await createUser.save();
     //if the user successfully signs up create a record for subscription
     console.log('my resp',response._id)
    if(response){ 
      const createSubscription = new Subscription({
        subscriptionPlanName : "FREE",
        description : "Create 5 free logistics",
        user : response._id,
        subscriptionCredits : 5,
        priceOfSubscriptionPlan : 0,
     });

     const saveSubscription = await createSubscription.save();

      if(saveSubscription){
        var newSuccess = new Response(201, 'You have successfully signed up', 'Success');
        return res.status(201).json(newSuccess.successObject());
      }
    }
    

  }

  catch (error) {
    //check if email already exist 
    if (error.code === 11000 & error.keyPattern && error.keyPattern, email) {
      console.log(error.message)
      var response = new Response(422, 'Sorry email address or phone already exists', 'Sorry email address or phone already exists');
      return res.status(422).json(response.errorObject());
    }
    response = new Response(500, 'Internal Server Error', error.message);
    return res.status(500).json(response.errorObject());
  }
}




const createNewCustomer = async (req, res) => {

  const { firstname, lastname, phone, email, confirm_password, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedConfirmPassword = bcrypt.hashSync(confirm_password, 10)
    const createUser = new User({
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: hashedPassword,
      confirm_password: hashedConfirmPassword
    });

    const response = await createUser.save();
    var newSuccess = new Response(201, 'You have successfully signed up', 'Success');
    return res.status(201).json(newSuccess.successObject());

  }

  catch (error) {
    //check if email already exist 
    if (error.code === 11000 & error.keyPattern && error.keyPattern, email) {
      var response = new Response(400, 'Sorry Email Address Already Exists', error.message);
      return res.status(400).json(response.errorObject());
    }
    response = new Response(500, 'Internal Server Error', error.message);
    return res.status(500).json(response.errorObject());
  }
}

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(422).json({
      status: false,
      message: 'Sorry Email is required'
    })
  }

  if (!password) {
    return res.status(422).json({
      status: false,
      message: 'Sorry Password  is required'
    })
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      let newError = new Response(400, 'Sorry Invalid credentials provided', 'Failed');
      console.log('error', newError)
      return res.status(400).json(newError.errorObject());
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    var newSuccess = new Response(200, 'Success', 'User has successfully signed in');

    //instead of sending tokens to frontend client save it in http only cookie to avoid 
    //attackers accesssing the tokens
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,  // HTTPS only in production
      maxAge: 3600000,
      sameSite: 'None',  // Allows cross-origin cookies
      path: '/'
    });

    console.log('cookies recieved',req.cookies )
    console.log('headers',req.headers)
    return res.status(200).json(newSuccess.successObject());


  }
  catch (error) {
    newError = new Response(500, 'Internal Server Error', error.message);
    return res.status(500).json(newError.errorObject());
  }
}


module.exports = { LoginUser, createNewUser, createNewCustomer, userInformation };