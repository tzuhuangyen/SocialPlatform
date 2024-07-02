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
    name: {
      type: String,
      required: [true, 'Post must have an name'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: { type: Date, default: Date.now(), select: false },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const PostModel = mongoose.model('Post', postSchema);

// const init = async () => {
//   const AllPosts = await PostModel.find();
//   console.log('All Posts:', AllPosts);
// };
// init();
module.exports = PostModel;
