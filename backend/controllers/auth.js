const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.register = async (req, res) => {
 try {
  const user = new User(req.body);
  await user.save();
  res
   .status(200)
   .json({
    message: 'User Succesfully added to database',
    payload: null,
    status: 200,
   });
 } catch (error) {
  res.status(400).json({
   payload: null,
   status: 400,
   message:
    'Failed to add user to database, Potential reason could be - Email and Username already exists',
  });
 }
};

exports.login = async (req, res) => {
 const { userName, password } = req.body;
 const user = await User.findOne({ userName: userName });
 user.comparePassword(password, (err, result) => {
  if (err) {
   res
    .status(400)
    .json({ message: 'Invalid Credentials', payload: null, status: 400 });
  }
  if (result === true) {
   const token = jwt.sign(
    {
     email: user.email,
     userName: userName,
    },
    process.env.SECRET_KEY,
    // { expiresIn: '7d' },
   );
   res
    .status(200)
    .json({ message: 'Logged In Successfully', payload: token, status: 200 });
  } else {
   res
    .status(401)
    .json({ message: 'Invalid Credentials', payload: null, status: 401 });
  }
 });
};
