const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const router = express.Router();
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const bcrypt = require('bcrypt');
const Validator = require('validator');
const userModel = require('../models/userModel');
const { generateJWT, isAuth } = require('../service/auth');
//sign up
router.post(
  '/sign_up',
  handleErrorAsync(async (req, res, next) => {
    let { email, password, confirmPassword, name } = req.body;
    //check all inputs are not empty
    if (!email || !password || !confirmPassword || !name) {
      return next(appError(400, 'input can not be empty', next));
    }
    //check password and confirm password are the same
    if (password !== confirmPassword) {
      return next(
        appError(400, 'password and confirmPassword are not the same', next)
      );
    }
    //check password length
    if (!Validator.isLength(password, { min: 5 })) {
      return next(
        appError(400, 'password length must be at least 5 characters', next)
      );
    }
    //check email format
    if (!Validator.isEmail(email)) {
      return next(appError(400, 'email format is not correct', next));
    }

    //bcrypt password
    password = await bcrypt.hash(req.body.password, 12);
    const newUser = await userModel.create({
      email,
      password,
      name,
    });
    generateJWT(newUser, 201, res);
  })
);

//login
router.post(
  '/login',
  handleErrorAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(appError(400, 'email and password are required', next));
    }
    const user = await userModel.findOne({ email }).select('+password');
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(appError(400, 'email or password incorrect', next));
    }
    generateJWT(user, 200, res);
  })
);

//get users
router.get(
  '/profile',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const users = await userModel.find();
    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  })
);

//update password
router.post(
  '/updatePassword',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return next(
        appError(400, 'password and confirmPassword are not the same', next)
      );
    }
    newPassword = await bcrypt.hash(password, 12);

    const user = await userModel.findByIdAndUpdate(req.user.id, {
      password: newPassword,
    });
    generateJWT(user, 200, res);
  })
);

module.exports = router;
