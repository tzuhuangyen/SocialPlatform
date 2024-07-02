const PostModel = require('../models/postModel');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const postControllers = {
  async getPosts(req, res) {
    try {
      const AllPosts = await PostModel.find();
      handleSuccess(res, AllPosts);
    } catch (error) {
      handleError(res, error);
    }
  },
  async createPosts(req, res) {
    try {
      console.log('Request body:', req.body);
      const newPost = await PostModel.create(req.body);
      handleSuccess(res, newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      handleError(res, error);
    }
  },
};
module.exports = postControllers;
