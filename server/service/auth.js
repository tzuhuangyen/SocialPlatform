const jwt = require('jsonwebtoken');
const appError = require('./appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const userModel = require('../models/userModel');

const generateJWT = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRED_DAY,
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user: {
      token,
      name: user.name,
    },
  });
};
const isAuth = handleErrorAsync(async (req, res, next) => {
  //token is in the header?
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(appError(401, 'you are not logged in', next));
  }
  ///if token then verify token
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
  const currentUser = await userModel.findById(decoded.id);
  req.user = currentUser;
  next();
});

module.exports = { generateJWT, isAuth };
