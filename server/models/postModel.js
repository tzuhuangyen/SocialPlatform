const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Post must have content'],
    },
    image: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an userID'],
    },
    likes: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    createdAt: { type: Date, default: Date.now, select: false },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//virtual是mongoose的虛擬欄位，可以讓我們在schema中定義一個虛擬欄位，這個欄位不會被存到資料庫中，但是可以讓我們在查詢時使用，例如我們可以在postSchema中定義一個虛擬欄位comments，這個欄位會指向Comment這個model，這樣我們就可以在查詢post時，同時查詢出這個post的所有comments。
//如果沒有這個虛擬欄位 在貼文中只會顯示user id 沒有name
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});
const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
