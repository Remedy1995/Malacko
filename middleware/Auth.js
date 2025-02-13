const jwt = require('jsonwebtoken');

exports.AuthenticateToken = (req, res, next) => {

    console.log('hello ',req.cookies)
   // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      const token = req.cookies["access_token"]
      console.log('jhjkk',req.cookies)
    if (!token) {
        console.log('token has not been added',token)
        return res.status(401).json({
            'status': false,
            message: 'Sorry token is not available'
        })
    }
          
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log('This is the error',err)
        if (err) {
            return res.status(401).json({status : 401 ,message : 'Token expired or invalid'});
        }
        console.log("This is decoded",decoded)
        req.userId = decoded.userId;

        next();
   });
} 
