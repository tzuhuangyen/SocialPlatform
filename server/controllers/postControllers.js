const PostModel = require('../models/postModel');

const postControllers = {
  async getPosts(req, res) {
    try {
      const AllPosts = await PostModel.find();
      res.status(200).json({
        AllPosts,
      });
    } catch (error) {
      res.status(500).json({
        message: 'get posts fail',
        error: error.message,
      });
    }
  },
  async createPosts(req, res) {
    try {
      console.log('Request body:', req.body);
      const newPost = await PostModel.create(req.body);
      res.status(201).json({
        message: 'create post success',
        post: newPost,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(400).json({
        message: 'create post fail',
        error: error.message,
      });
    }
  },
};
module.exports = postControllers;
