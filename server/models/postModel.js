const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: [true, 'Post must have content'] },
  image: {
    type: String,
    default: '',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must have an author'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now },
});

const PostModel = mongoose.model('Post', postSchema);

// const init = async () => {
//   const AllPosts = await PostModel.find();
//   console.log('All Posts:', AllPosts);
// };
// init();
module.exports = PostModel;
