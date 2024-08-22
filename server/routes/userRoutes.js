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

const upload = require('../controllers/uploadControllers');
const { v4: uuidv4 } = require('uuid');
const firebaseAdmin = require('../connections/firebase');
const bucket = firebaseAdmin.storage().bucket();

const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
//app.use('/api/users', userRoutes);
//v sign up v
router.post(
  '/sign_up',
  handleErrorAsync(async (req, res, next) => {
    let { email, password, confirmPassword, nickname } = req.body;
    //check all inputs are not empty
    if (!email || !password || !confirmPassword || !nickname) {
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
    // 创建新用户
    const newUser = await UserModel.create({
      email,
      password,
      nickname,
    });
    generateJWT(newUser, 201, res);
  })
);
//v login  / sign in v
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
//v update password v
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
    const newPassword = await bcrypt.hash(password, 12);

    const user = await userModel.findByIdAndUpdate(req.user.id, {
      password: newPassword,
    });
    generateJWT(user, 200, res);
  })
);
//v get user's profile v
router.get(
  '/profile',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const user = await userModel.findById(req.user.id).select('nickname email');
    if (!user) {
      return next(appError(404, 'User not found', next));
    }
    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  })
);
//v PATCH：{url}/users/profile: 更新個人資料 v
router.patch(
  '/updateProfile',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const { nickname } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { nickname },
      {
        new: true,
      }
    );
    if (!user) {
      return next(appError(404, 'User not found', next));
    }
    res.status(200).json({
      status: 'success',
      user,
    });
  })
);
//image
//get image
// router.get(
//   '/image',
//   handleErrorAsync(async (req, res) => {
//     const [files] = await bucket.getFiles();

//     const fileList = await Promise.all(
//       files.map(async (file) => {
//         const [fileUrl] = await file.getSignedUrl({
//           action: 'read',
//           expires: '03-09-2491',
//         });
//         return {
//           fileName: file.name,
//           imgUrl: fileUrl,
//         };
//       })
//     );

//     res.send(fileList);
//   })
// );

// v upload image v
router.post(
  '/upload/image',
  isAuth,
  upload,
  handleErrorAsync(async (req, res, next) => {
    if (!req.file) {
      return next(appError(400, 'please upload image', next));
    }
    if (!req.user || !req.user._id) {
      return next(appError(400, 'User not authenticated', next));
    }
    //取得用戶上傳的第一個檔案
    const file = req.file;
    //基於檔案的原始名稱建立一個blob物件 生成新的文件名，防止文件名冲突
    const blob = bucket.file(
      `images/${uuidv4()}.${file.originalname.split('.').pop()}`
    );
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream();
    // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on('finish', () => {
      console.log('Upload finished, generating signed URL...');

      // 設定檔案的存取權限
      const config = {
        action: 'read', // 權限
        expires: '12-31-2500', // 網址的有效期限
      };
      // 取得檔案的網址
      blob.getSignedUrl(config, async (err, imgUrl) => {
        if (err) {
          console.error('Error generating signed URL:', err);

          return res.status(500).send(err.message);
        }
        console.log('Generated signed URL:', imgUrl);

        // 這裡將圖片URL保存到MongoDB中
        const userId = req.user._id; // 假設已經進行身份驗證
        await UserModel.findByIdAndUpdate(userId, {
          photo: imgUrl,
        });
        res.send({
          imgUrl: imgUrl,
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
//delete image
// router.delete('/delete/image', (req, res) => {
//   // 取得檔案名稱
//   const fileName = req.query.fileName;
//   // 取得檔案
//   const blob = bucket.file(fileName);
//   // 刪除檔案
//   blob
//     .delete()
//     .then(() => {
//       res.send('delete success');
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// });

//get / likes list 取得個人按其他人讚列表v
router.get(
  'getLikeList',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const likeList = await PostModel.find({
      likes: { $in: req.user.id },
    }).populate({
      path: 'user',
      select: 'name photo _id',
    });
    res.status(200).json({
      status: 'success',
      likeList,
    });
  })
);
//post / unlike
//
//get followers list取得個人追蹤他人名單
router.get(
  '/followers',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const followers = await UserModel.find({
      _id: req.user.id,
    }).populate({
      path: 'followers.user',
      select: 'name photo _id',
    });
    res.status(200).json({
      status: 'success',
      followers: followers[0].followers,
    });
  })
);

//follower 取消用戶追蹤他人v
router.post(
  '/:id/follow',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    if (req.params.id === req.user.id) {
      return next(appError(400, 'you can not follow yourself', next));
    }
    await UserModel.updateOne(
      {
        _id: req.user.id,
        'following.user': { $ne: req.params.id },
      },
      {
        $addToSet: { following: { user: req.params.id } },
      }
    );
    await UserModel.updateOne(
      {
        _id: req.params.id,
        'followers.user': { $ne: req.user.id },
      },
      {
        $addToSet: { followers: { user: req.user.id } },
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'follow success',
    });
  })
);
//unFollowing 取消追蹤朋友v
router.delete(
  '/:id/unfollow',
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    if (req.params.id === req.user.id) {
      return next(appError(400, 'you can not unfollow yourself', next));
    }
    await UserModel.updateOne(
      {
        _id: req.user.id,
      },
      { $pull: { following: { user: req.params.id } } }
    );
    await UserModel.updateOne(
      {
        _id: req.params.id,
      },
      { $pull: { followers: { user: req.user.id } } }
    );

    res.status(200).json({
      status: 'success',
      message: 'unfollow success',
    });
  })
);

module.exports = router;
