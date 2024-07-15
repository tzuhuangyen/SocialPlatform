const mongoose = require('mongoose');
// schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'enter your name'] },
    email: {
      type: String,
      unique: true,
      required: [true, 'enter your email'],
      lowercase: true,
      select: false, //不要顯示給前台用戶
    },
    photo: String,
    createdAt: {
      type: Date,
      default: Date.now,
      select: false, //不要顯示給前台用戶
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },

  { versionKey: false }
);

//test add model to collection
//若是要編輯options則要用mongoose.model()
const UserModel = mongoose.model('User', userSchema);

//model
module.exports = UserModel;
