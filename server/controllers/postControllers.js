const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const appError = require('../service/appError');

const postControllers = {
  async getPosts(req, res, next) {
    //新的訊息在前面timeSort == 'asc'
    const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
    console.log('Sorting order:', timeSort);

    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    console.log('Query filter:', q);

    const getAllPosts = await PostModel.find(q)
      .populate({
        path: 'user',
        select: 'name photo ',
      })
      .sort(timeSort)
      .select('+createdAt');
    console.log('Number of posts retrieved:', getAllPosts.length);

    if (getAllPosts.length > 0) {
      console.log('First post date:', getAllPosts[0].createdAt);
      console.log(
        'Last post date:',
        getAllPosts[getAllPosts.length - 1].createdAt
      );
    }
  },
  async createPosts(req, res, next) {
    console.log('Request body:', req.body);
    const { content, user } = req.body;

    if (!content || !user) {
      return next(appError(400, 'Content and user are required'));
    }
    const newPost = await PostModel.create(req.body);
    handleSuccess(res, newPost);
  },
};
module.exports = postControllers;
