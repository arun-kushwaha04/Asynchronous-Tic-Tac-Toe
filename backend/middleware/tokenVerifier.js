const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
 const token = req.headers.authorization;
 jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
  if (err) {
   if (err.name === 'TokenExpiredError') {
    res.status(400).json({
     message: 'Token Expired',
     payload: null,
     status: 200,
    });
    return;
   } else {
    res.status(400).json({
     message: 'Internal Server Error',
     payload: null,
     status: 400,
    });
    return;
   }
  } else {
   if (result) {
    next();
   } else {
    res.status(400).json({
     message: 'Token Expired',
     payload: null,
     status: 200,
    });
    return;
   }
  }
 });
};
