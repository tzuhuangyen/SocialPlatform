const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const router = express.Router();

const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
//id validator bcrypt
const bcrypt = require('bcrypt');
const Validator = require('validator');
const userModel = require('../models/userModel');
const { generateJWT, isAuth } = require('../service/auth');
//upload image
// const sizeOf = require('image-size');
const upload = require('../controllers/uploadControllers');
// const { ImgurClient } = require('imgur');
const { v4: uuidv4 } = require('uuid');
const firebaseAdmin = require('../connections/firebase');
const uploadControllers = require('../controllers/uploadControllers');
const bucket = firebaseAdmin.storage().bucket();
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
//image
//get image
router.get(
  '/image',
  handleErrorAsync(async (req, res) => {
    const [files] = await bucket.getFiles();

    const fileList = await Promise.all(
      files.map(async (file) => {
        const [fileUrl] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        });
        return {
          fileName: file.name,
          imgUrl: fileUrl,
        };
      })
    );

    res.send(fileList);
  })
);

//upload image
router.post(
  '/upload/image',
  // isAuth,
  upload.single('file'),
  handleErrorAsync(async (req, res, next) => {
    if (!req.file.length) {
      return next(appError(400, 'please upload image', next));
    }
    //取得用戶上傳的第一個檔案
    const file = req.file[0];
    //基於檔案的原始名稱建立一個blob物件
    const blob = bucket.file(
      `images/${uuidv4()}.${file.originalname}.split('.)`
    );
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream();
    // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on('finish', () => {
      // 設定檔案的存取權限
      const config = {
        action: 'read', // 權限
        expires: '12-31-2500', // 網址的有效期限
      };
      // 取得檔案的網址
      blob.getSignedUrl(config, (err, imgUrl) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.send({
          imgUrl,
        });
      });
    });
    // 如果上傳過程中發生錯誤，會觸發 error 事件
    blobStream.on('error', (err) => {
      res.status(500).send(err.message);
    });
    // 將檔案的 buffer 寫入 blobStream
    blobStream.end(file.buffer);
  })
);

router.delete('/delete/image', (req, res) => {
  // 取得檔案名稱
  const fileName = req.query.fileName;
  // 取得檔案
  const blob = bucket.file(fileName);
  // 刪除檔案
  blob
    .delete()
    .then(() => {
      res.send('delete success');
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
