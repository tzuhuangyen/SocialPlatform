const PostModel = require('../models/postModel');

const postControllers = {
  async getPosts(req, res) {
    const AllPosts = PostModel.find();
    res.status(200).json({
      AllPosts,
    });
  },
  async createPosts({ body, req, res }) {
    try {
      console.log(req.body);
      const newPost = await PostModel.create(req.body);
      res.status(200).json({
        message: 'create post success',
        posts: newPost,
      });
    } catch (error) {
      res.status(400).json({
        message: 'create post fail',
      });
    }
  },
};
module.exports = postControllers;
