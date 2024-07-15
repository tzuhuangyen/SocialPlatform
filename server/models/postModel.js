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
      type: Number,
      default: 0,
    },

    createdAt: { type: Date, default: Date.now, select: false },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
