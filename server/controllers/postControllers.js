const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const appError = require('../service/appError');
const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const CommentModel = require('../models/commentsModal');
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
      .populate({
        path: 'comments',
        select: 'comment user',
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
    res.status(200).json({
      status: 'success',
      results: getAllPosts.length,
      data: {
        posts: getAllPosts,
      },
    });
  },
  async createPosts(req, res, next) {
    console.log('Request body:', req.body);
    const { content } = req.body; // 确保解构 req.body 中的 content

    if (!content) {
      return next(appError(400, 'Content is required', next));
    }
    const newPost = await PostModel.create({
      content,
      user: req.user._id, // 将当前用户的 ID 添加到新帖子中
    });
    handleSuccess(res, newPost);
  },
  async replyComment(req, res, next) {
    const user = req.user ? req.user._id : null;
    const post = req.params.id;
    const { comment } = req.body;

    if (!user) {
      return next(appError(401, 'Unauthorized: User not found', next));
    }
    const newComment = await CommentModel.create({
      post,
      user,
      comment,
    });
    res.status(200).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  },
};
module.exports = postControllers;
